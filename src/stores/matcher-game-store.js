import { defineStore } from 'pinia';

export const useMatcherGameStore = defineStore('matcherGame', {
  state: () => ({
    rows: 4,
    cols: 4,
  }),
  getters: {
    numRows: (state) => state.rows,
    numColumns: (state) => state.cols,
  },
  actions: {
    updateGrid(rows, cols) {
      this.numRows = rows;
      this.numColumns = cols;
    },
  },
});
