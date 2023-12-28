<script setup>
import { defineComponent, computed, toRaw } from 'vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import * as dateUtils from 'src/lib/dateUtils'
import * as timeUtils from 'src/lib/timeUtils'
import moment from 'moment'
import Click2Show from 'src/components/Click2Show.vue'

let numEach = ref(10)

const randomDates = computed(() => {
  let acc = []
  for (let i=0;i<numEach.value;i++) {
    let randomDate = dateUtils.randomDateInRange(new Date("Jan 1, 1900"), new Date())
    acc.push([
      randomDate,
      moment(randomDate).format("YYYY-MM-DD"),
      moment(randomDate).format("MMM Do, YYYY"),
      dateUtils.getFullDateAsText(randomDate)
    ])
  }
  return acc
})

console.log("randomDates", toRaw(randomDates.value))

</script>
<template>
  <q-page class="flex flex-center">
    <div class="q-pa-sm grid-container q-gutter-sm">
      <div class="row q-gutter-md">
        <div class="col-auto numbers-input-col">
          <q-input outlined v-model="numEach" label="Num Each" min="5" max="100" type="number" />
        </div>
      </div>
      <div class="row q-gutter-md q-pt-md" v-for="(date, i) in randomDates" :key="'ran-dates-'+i">
        <div class="col-2">
          {{ date[2] }}
        </div>
        <div class="col-2">
          {{ date[1] }}
        </div>
        <div class="col-grow" style="text-align: right;">
          <Click2Show :value="date[3]" divClass="tibetan"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style type="text/scss">
.grid-container {
  width: 100%;
  margin: 20px;
}
.tibetan {
  font-size: 160%;
  font-family: Himalaya;
}
</style>

