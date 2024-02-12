<script setup>
import { defineComponent, computed, toRaw } from 'vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import * as dateUtils from 'src/lib/dateUtils'
import * as timeUtils from 'src/lib/timeUtils'
import moment from 'moment'
import * as utils from 'src/lib/utils'
import Click2Show from 'src/components/Click2Show.vue'

let numEach = ref(10)

const randomTimes = computed(() => {
  let acc = []
  for (let i=0;i<numEach.value;i++) {
    let hour = timeUtils.generateRandomHour();
    let mins = timeUtils.generateRandomMinutes()
    let timeObj = timeUtils.getTimeAsText(hour,mins)


    if (mins < 30 ) {
      acc.push([hour+":"+mins + " (use ཡོལ་ནས་)",timeObj.string,utils.styleTibetan(timeUtils.hints[timeObj.type])])
      let timeObj2 = timeUtils.getTimeAsText(hour,mins,true)
      acc.push([hour+":"+mins + " (use དང་)",timeObj2.string,utils.styleTibetan(timeUtils.hints[timeObj2.type])])
    }
  else {
      acc.push([hour+":"+mins,timeObj.string,utils.styleTibetan(timeUtils.hints[timeObj.type])])
    }

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
        <div class="col-grow" style="text-align: right;">
          <Click2Show :value="time[1]" divClass="tibetan" :vHtml="true" :key="time+i" :isShow="false"/>
        </div>
        <div class="col-12">
          <Click2Show label="hint" :value="time[2]" :vHtml="true" :key="hint+i" :isShow="false"/>
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

