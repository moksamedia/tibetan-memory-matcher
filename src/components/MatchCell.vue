<template>
<div
  v-if="!smallScreenMode"
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
<div
  v-else
  class="col-grow flex-center value-cell prevent-select"
  :class="{ front: front,
            selected: selected,
            notSelected: !selected,
            matched: matched,
            peeking: peeking}"
  @click="handlePress"
  >
  <div style="height:40px;"></div>
</div>
<q-dialog
v-if="smallScreenMode"
v-model="showDialog"
position="top"
full-width="true"
transition-duration="100"
auto-close
>
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <div>
            {{value}}
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
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
    },
    smallScreenMode: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {

    let showDialog = ref(false)

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

      if (showDialog.value) showDialog.value = false

      if (store.isSelected(noteObj)) {
          store.unselect(noteObj)
      }
      else if (store.canSelect()) {
        store.setSelected(noteObj)
        showDialog.value = true

        if (noteObj.audio) {
          noteObj.audio.play()
        }

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
      value: noteObj.value,
      showDialog
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
  font-size: 2.0em;
}
.front {
  font-size: 4em;
  font-family: 'himalaya';
}
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

@media screen and (max-width: 800px) {
  .front {
    font-size: 1.8em;
    font-family: 'monlam-chouk';
  }
  .value-cell {
    border: 1px black solid;
    border-radius: 2px;
    text-align: center;
    padding: 10px 5px;
    display: flex;
    align-items: center;
    font-size: 1.0em;
  }
}

</style>
