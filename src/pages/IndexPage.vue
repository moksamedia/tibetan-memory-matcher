<template>
  <q-page class="flex flex-start">
    <div class="q-pa-sm grid-container q-gutter-sm">
      <div class="row" id="file-input-row">
          <div class="col col-2">
            <q-btn @click="reloadGame" color="white" text-color="black" label="Reload" />
          </div>
          <div class="col col-4" style="text-align: left; font-size: 20px;">
            <span>{{ `${availableNotes.length} / ${data.length}`}}</span>
          </div>
          <div class="col col-6">
            <q-file
              v-model="file"
              label="Upload JSON File"
              accept=".json"
              @update:model-value="loadJson"
            />
          </div>
        </div>
      <div v-if="shuffledMatrix" :key="dingMeToUpdate">
        <div class="row q-gutter-sm content-stretch" v-for="column, i in shuffledMatrix" :key="'row'+i">
            <MatchCellVue,
              v-for="item, j in column" :key="'col'+item.nid"
              :noteObj="item"
              :row="j"
              :column="i"
              :smallScreenMode="smallScreenMode"
            />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useMatcherGameStore } from 'src/stores/matcher-game-store'
import { ref } from 'vue'
import MatchCellVue from 'src/components/MatchCell.vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

function stripHtml(value) {
  const div = document.createElement('div')
  div.innerHTML = value
  return div.textContent || div.innerText || '';
}

const randomFromArray = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function isOdd(num) {
  return num % 2 != 0
}

function randomInsertIntoArray(value, array) {
  const i = Math.round(Math.random() * array.length)
  array.splice(i, 0, value)
  return array
}

function getSoundForNote(note) {
  if (note?.fields?.Sound) {
    if (!note?.fields?.Sound) return null;
    const match = note.fields.Sound.match(/\[sound:([^\]]*)\]/)
    return new Audio("./collection.media/"+match[1]);
  }
}

function separateNoteValues(notes) {
  let i = 0;
  return notes.reduce((acc, currentNote) => {
    let front = {
      value: stripHtml(currentNote.fields.Tibetan),
      side:"front",
      index: i,
      note:currentNote,
      audio:getSoundForNote(currentNote),
      nid:currentNote.nid
    }
    i++;
    let back = {
        value: stripHtml(currentNote.fields.English),
        side:"back",
        index: i,
        note:currentNote,
        audio:getSoundForNote(currentNote),
        nid:currentNote.nid
      }
    i++;
    front.match = back
    back.match = front
    acc.push(front)
    acc.push(back)
    return acc
  },[])
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

export default defineComponent({
  name: 'IndexPage',
  components: {
    MatchCellVue
  },
  setup() {

    const file = ref(null)
    const data = ref([])
    const availableNotes = ref([])
    const shuffledMatrix = ref(null)
    const usedNotes = []
    const dingMeToUpdate = ref(0)

    const loadJson = async () => {
          if (!file.value) return
          console.log(file.value)
          try {
            const jsonText = await file.value.text()
            data.value = JSON.parse(jsonText)
            data.value = data.value.filter(v => v.fields.Tibetan && v.fields.English)
            availableNotes.value = data.value
            console.log(data.value)
            selectRandomAndPrepareGame()
          }
          catch (error) {
            console.error(`Error loading file ${file.value.name}:`, error);
          }
        };

    const $q = useQuasar()
    const smallScreenMode = ref($q.screen.lt.md)

    const store = useMatcherGameStore()
    let {cols, rows, reveals} = storeToRefs(store)

    let selectedRow = ref(0)
    let selectedColumn = ref(0)

    const size = rows.value * cols.value
    const halfSize = Math.trunc(size/2)

    function reloadGame() {
      selectRandomAndPrepareGame()
      dingMeToUpdate.value = dingMeToUpdate.value + 1
    }

    function selectRandomAndPrepareGame() {

      // get a random selection of notes for the matrix
      let randomNotes = randomFromArray(availableNotes.value, halfSize)
      console.log(`${randomNotes.length} notes selected`)
      availableNotes.value = availableNotes.value.filter(v => !randomNotes.includes(v))
      console.log(`${availableNotes.value.length} left available out of ${data.value.length}`)

      // split the tibetan and english
      let separatedNoteValues = separateNoteValues(randomNotes)

      // if grid has an odd number of sizes, must include a joker card
      if (isOdd(size)) {
        separatedNoteValues.push({value:"JOKER", side:"joker", match:0})
      }

      let shuffledArray = shuffle(separatedNoteValues)
      //console.log(shuffledArray)
      shuffledMatrix.value = listToMatrix(shuffledArray, cols.value)
      console.log(shuffledMatrix)
    }

    function objForRowColumn(row, column) {
      // have to convert to zero-index
      const zRow = row-1, zCol = column -1
      console.log("shuffledMatrix",shuffledMatrix)
      console.log(`Getting noteObj for row = ${zRow}, col = ${zCol}`)
      let cellObj = shuffledMatrix.value[zRow][zCol]
      return cellObj;
    }

    const noteObjForRowCol = computed((row, col) => {
      if (!row || !col) return null
      console.log(`Getting noteObj for row = ${row}, col = ${col}`)
      return objForRowColumn(row,col)
    })

    function valueForRowColumn(row, column) {
      const obj = objForRowColumn(row, column)
      return obj.value
    }

    function sideForRowColumn(row, column) {
      return objForRowColumn(row, column).side
    }

    function isFront(row, column) {
      return sideForRowColumn(row, column) == 'front'
    }

    return {
      numRows: store.numRows,
      numColumns: store.numColumns,
      getValue: valueForRowColumn,
      getSide: sideForRowColumn,
      getObj: objForRowColumn,
      isFront,
      selectedRow,
      selectedColumn,
      reveals,
      smallScreenMode,
      loadJson,
      file,
      data,
      shuffledMatrix,
      reloadGame,
      availableNotes,
      dingMeToUpdate,
      noteObjForRowCol
    }
  }
})

</script>

<style type="text/scss">
.q-page-container {
  background-color: rgb(206, 206, 206);
  width: 100%;
}
.grid-container {
  width: 100%;
}
</style>
