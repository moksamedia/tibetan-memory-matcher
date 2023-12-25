<template>
<div
  class="col flex-center value-cell prevent-select"
  :class="{ front: front,
            selected: selected,
            notSelected: !selected,
            matched: matched,
            peeking: peeking}"
  @click="handlePress"
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

    const {noteObj} = props;

    const store = useMatcherGameStore()

    const isSelected = computed(() => {
      return store.isSelected(noteObj)
    })

    const isMatched = computed(() => {
      return store.isMatched(noteObj)
    })

    const isPeeking = computed(() => {
      return store.peeking
    })

    function onclick(e) {

      if (isMatched.value) {
        return;
      }

      if (store.isSelected(noteObj)) {
          store.unselect(noteObj)
      }
      else if (store.canSelect()) {
        store.setSelected(noteObj)

        if (store.hasMatch(noteObj)) {
          const match = store.getMatch(noteObj)
          store.addMatched(match)
          store.addMatched(noteObj)
          store.unselect(match)
          store.unselect(noteObj)
        }
        else {
          store.incrementReveals()
        }
      }

    }

    //console.log(`${props.row}, ${props.column} :: ${props.selectedRow}, ${props.selectedColumn}`)

    return {
      handlePress: onclick,
      selected: isSelected,
      matched: isMatched,
      peeking: isPeeking,
      front: noteObj.side == "front",
      value: noteObj.value
    }
  }
})

</script>
<style lang="scss" scoped>
.selected {
  background-color: rgb(241, 251, 255);
  opacity: 1.0;
}
.peeking {
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
  font-size: 1.3em;
}
.front {
  font-size: 3.2em;
  font-family: 'monlam-chouk';
}
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

</style>
