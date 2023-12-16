<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md grid-container q-gutter-md">
      <div class="row q-gutter-md" v-for="rowNumber in numRows" :key="'row'+rowNumber">
          <MatchCellVue
            v-for="colNumber in numColumns" :key="'col'+colNumber"
            :noteObj="getObj(rowNumber, colNumber)"
            :row="rowNumber"
            :column="colNumber"
            :selectedRow="selectedRow"
            :selectedColumn="selectedColumn"
          />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import notes from 'src/assets/notes.csv'
import { useMatcherGameStore } from 'src/stores/matcher-game-store'
import { ref } from 'vue'
import MatchCellVue from 'src/components/MatchCell.vue'
import { storeToRefs } from 'pinia'

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

function separateNoteValues(notes) {
  let i = 0;
  return notes.reduce((acc, currentNote) => {
    let front = {value: currentNote.front, side:"front", index: i}
    i++;
    let back = {value: currentNote.back, side:"back", index: i}
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

    const store = useMatcherGameStore()
    let {cols, rows, reveals} = storeToRefs(store)

    let selectedRow = ref(0)
    let selectedColumn = ref(0)

    const size = rows.value * cols.value
    const halfSize = Math.trunc(size/2)

    let randomNotes = randomFromArray(notes, halfSize)
    let separatedNoteValues = separateNoteValues(randomNotes)

    // if grid has an odd number of sizes, must include a joker card
    if (isOdd(size)) {
      separatedNoteValues.push({value:"JOKER", side:"joker", match:0})
    }

    let shuffledArray = shuffle(separatedNoteValues)
    //console.log(shuffledArray)
    let shuffledMatrix = listToMatrix(shuffledArray, cols.value)
    //console.log(shuffledMatrix)

    function objForRowColumn(row, column) {
      // have to convert to zero-index
      const zRow = row-1, zCol = column -1
      let cellObj = shuffledMatrix[zRow][zCol]
      return cellObj;
    }

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
      reveals
    }
  }
})

</script>

<style type="text/scss">
.grid-container {
  width: 90%;
  margin: 20px auto;
}
.q-page-container {
background-color: rgb(206, 206, 206);
}
</style>
