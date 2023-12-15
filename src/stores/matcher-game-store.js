import { defineStore } from 'pinia';

export const useMatcherGameStore = defineStore('matcherGame', {
  state: () => ({
    rows: 6,
    cols: 6,
    selectedRow: 0,
    selectedColumn: 0,
    selectedNoteObj: null,
    selectedRow2: 0,
    selectedColumn2: 0,
    selectedNoteObj2: null
  }),
  getters: {
    numRows: (state) => state.rows,
    numColumns: (state) => state.cols,
    hasSelection: (state) => state.selectedNoteObj != null,
  },
  actions: {
    updateGrid(rows, cols) {
      this.numRows = rows;
      this.numColumns = cols;
    },
    setSelected(r,c, noteObj) {
      this.selectedRow = r
      this.selectedColumn = c
      this.selectedNoteObj = noteObj
    },
    setSelected2(r,c, noteObj) {
      this.selectedRow2 = r
      this.selectedColumn2 = c
      this.selectedNoteObj2 = noteObj
    },
    isSelected(r,c) {
      return this.selectedColumn == c && this.selectedRow == r
    },
    isSelected2(noteObj) {
      return this.noteObj2 == noteObj
    },
    clearSelection() {
      this.selectedColumn = 0
      this.selectedRow = 0
      this.selectedNoteObj = null
      this.selectedNoteObj2 = null
    }
  },
});
