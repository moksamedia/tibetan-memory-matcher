import { defineStore } from 'pinia';

export const useMatcherGameStore = defineStore('matcherGame', {
  state: () => ({
    rows: 4,
    cols: 4,
    selected: new Map(),
    maxSelect: 2,
    matched: new Map(),
    reveals: 0
  }),
  getters: {
    numRows: (state) => state.rows,
    numColumns: (state) => state.cols,
    hasSelection: (state) => state.selected.size > 0
  },
  actions: {
    updateGrid(rows, cols) {
      this.numRows = rows;
      this.numColumns = cols;
    },
    setSelected(noteObj) {
      console.log(`Setting: ${noteObj.value}`, noteObj)
      this.selected.set(noteObj.value, noteObj)
    },
    unselect(noteObj) {
      this.selected.delete(noteObj.value)
    },
    isSelected(noteObj) {
      return this.selected.has(noteObj.value)
    },
    clearSelection() {
      this.selected.clear()
    },
    canSelect() {
      return this.selected.size < this.maxSelect
    },
    hasMatch(toCheck) {
      return this.selected.has(toCheck.match.value)
    },
    getMatch(toCheck) {
      return this.selected.get(toCheck.match.value)
    },
    addMatched(noteObj) {
      this.matched.set(noteObj.value, noteObj)
    },
    isMatched(noteObj) {
      const match = this.matched.has(noteObj.value)
      return match;
    },
    incrementReveals() {
      this.reveals = this.reveals + 1
      console.log("reveals=" + this.reveals)
    }
  },
});
