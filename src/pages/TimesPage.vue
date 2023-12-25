<script setup>
import { defineComponent, computed, toRaw } from 'vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import * as dateUtils from 'src/lib/dateUtils'
import * as timeUtils from 'src/lib/timeUtils'
import moment from 'moment'

let numEach = ref(10)

const randomTimes = computed(() => {
  let acc = []
  for (let i=0;i<numEach.value;i++) {
    let hour = timeUtils.generateRandomHour();
    let mins = timeUtils.generateRandomMinutes()
    let timeObj = timeUtils.getTimeAsText(hour,mins)
    acc.push([hour+":"+mins,timeObj.string,timeUtils.hints[timeObj.type]])
  }
  return acc
})

</script>
<template>
  <q-page class="flex flex-center">
    <div class="q-pa-sm grid-container q-gutter-sm">
      <div class="row q-gutter-md">
        <div class="col-auto numbers-input-col">
          <q-input outlined v-model="numEach" label="Num Each" min="5" max="100" type="number" />
        </div>
      </div>
      <div class="row q-gutter-md q-pt-md" v-for="(time, i) in randomTimes" :key="'ran-times-'+i">
        <div class="col-2">
          {{ time[0] }}
        </div>
        <div class="col-auto">
          {{ time[1] }}
        </div>
        <div class="col-12" v-html="time[2]"></div>
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

