<template>
<div
  class="col value-cell flex-center prevent-select"
  :class="{front: front, selected: selected, notSelected: !selected, matched: matched}"
  @click="_handlePress"
  >
  <div>{{value}}</div>
</div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useMatcherGameStore } from 'src/stores/matcher-game-store'

export default defineComponent({
  name: 'MatchCellVue',
  props: {

    noteObj: {
      type: Object,
      required: true
    },

    row: {
      type: Number,
      required: true
    },

    column: {
      type: Number,
      required: true
    }
  },
  setup(props) {

    const store = useMatcherGameStore()

    const isSelected = computed(() => {
      return store.isSelected(props.noteObj)
    })

    const isMatched = computed(() => {
      return store.isMatched(props.noteObj)
    })

    function onclick(e) {

      store.incrementReveals()

      if (isMatched.value) {
        console.log("Matched! " + props.noteObj.value)
        return;
      }

      if (store.isSelected(props.noteObj)) {
          store.unselect(props.noteObj)
      }
      else if (store.canSelect()) {
        let thisNoteObj = props.noteObj
        store.setSelected(props.noteObj)
        if (store.hasMatch(props.noteObj)) {
          const match = store.getMatch(props.noteObj)
          store.addMatched(match)
          store.addMatched(props.noteObj)
          store.unselect(match)
          store.unselect(props.noteObj)
        }
      }

    }

    //console.log(`${props.row}, ${props.column} :: ${props.selectedRow}, ${props.selectedColumn}`)

    return {
      _handlePress: onclick,
      selected: isSelected,
      matched: isMatched,
      front: props.noteObj.side == "front",
      value: props.noteObj.value
    }
  }
})

</script>
<style lang="scss" scoped>
.selected {
  background-color: rgb(241, 251, 255);
  opacity: 1.0;
}
.notSelected {
  color: rgba(0, 0, 0, 0.0);
  background-color: rgb(255, 255, 241);
}
.matched {
  background-color:rgb(236, 241, 255);
  opacity: 1.0;
  color: rgba(0, 0, 0, 1.0);
}
.value-cell {
  border: 3px black solid;
  border-radius: 5px;
  text-align: center;
  padding: 20px 10px;
  display: flex;
  align-items: center;
}
.front {
  font-size: 200% !important;
}
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
