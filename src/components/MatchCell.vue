<template>
<div
  :class="{front: front, selected: selected, notSelected: !selected}"
  @click="_handlePress"
  >
  {{value}}
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
      return store.isSelected(props.row, props.column)
    })

    function onclick(e) {
      if (store.hasSelection) {
        if (isSelected) {
          store.clearSelection()
        }
        console.log("curr", props.noteObj)
        console.log("sel", store.selectedNoteObj)
        const match = props.noteObj.value == store.selectedNoteObj.match.value
      }
      else {
        store.setSelected(props.row, props.column, props.noteObj)
      }
    }

    //console.log(`${props.row}, ${props.column} :: ${props.selectedRow}, ${props.selectedColumn}`)

    return {
      _handlePress: onclick,
      selected: isSelected,
      front: props.noteObj.side == "front",
      value: props.noteObj.value
    }
  }
})

</script>
<style lang="scss" scoped>
.selected {
  background-color: lightblue;
  opacity: 1.0;
}
.notSelected {
  color: rgba(0, 0, 0, 0);
    background-color: gray;
}
</style>
