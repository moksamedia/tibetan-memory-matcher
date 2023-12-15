<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md grid-container">
      <div class="row q-gutter-md" v-for="rowNumber in numRows" :key="'row'+rowNumber">
        <div class="col value-cell" v-for="colNumber in numColumns" :key="'col'+colNumber" :class="{front: getSide(rowNumber, colNumber) == 'front'}">
          {{this.getValue(rowNumber, colNumber)}}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import notes from 'src/assets/notes.csv'
import { useMatcherGameStore } from 'src/stores/matcher-game-store'

const randomFromArray = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  let shuffled = [...array]

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return array;
}


function valueForGrid(col, row) {

}

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
  setup() {

    const store = useMatcherGameStore()
    const size = store.numRows * store.numColumns
    const halfSize = Math.trunc(size/2)

    let randomNotes = randomFromArray(notes, halfSize)
    let separatedNoteValues = separateNoteValues(randomNotes)

    // if grid has an odd number of sizes, must include a joker card
    if (isOdd(separatedNoteValues.length)) {
      separatedNoteValues.push({value:"JOKER", side:"joker", match:0})
    }

    let shuffledArray = shuffle(separatedNoteValues)
    let shuffledMatrix = listToMatrix(shuffledArray, store.numColumns)

    function objForRowColumn(row, column) {
      console.log(`row=${row}, col=${column}`)
      let index = column + ((row-1)*store.numColumns)
      console.log(index)
      let cellObj = shuffledArray[index]
      console.log(`value=${cellObj.value}`, cellObj)
      return cellObj;
    }

    function valueForRowColumn(row, column) {
      const obj = objForRowColumn(row, column)
      return obj.value
    }

    function sideForRowColumn(row, column) {
      return objForRowColumn(row, column).side
    }

    return {
      numRows: store.numRows,
      numColumns: store.numColumns,
      getValue: valueForRowColumn,
      getSide: sideForRowColumn
    }
  }
})

</script>

<style type="text/scss">
.grid-container {
  width: 90%;
  margin: 20px auto;
}
.value-cell {
  text-align: center;
  padding: 10px;
}
.front {
  font-size: 200% !important;
  background-color: lightblue;
}
</style>
