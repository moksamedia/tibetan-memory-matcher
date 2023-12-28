<script setup>
import { defineComponent, toRaw, computed } from 'vue'
import Click2Show from 'src/components/Click2Show.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import {
  getRandomInt,
  getArrayOfRandomInts,
  toTibetanNumber,
  Number2Text
} from 'src/lib/numberUtils'

let min = ref(0)
let max = ref(1000)
let num = ref(10)

const num2Text = new Number2Text(false,false,false)

// let randomNumbers = ref(getArrayOfRandomInts(min.value, max.value, num.value))

const randomNumbers = computed(() => {
  return getArrayOfRandomInts(min.value, max.value, num.value)
})

</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-sm grid-container q-gutter-sm">
      <div class="row">
        <div class="col-2 numbers-input-col">
          <q-input outlined v-model="min" label="Min" type="number" />
        </div>
        <div class="col-2 numbers-input-col">
          <q-input outlined v-model="max" label="Max" type="number" />
        </div>
        <div class="col-2 numbers-input-col">
          <q-input outlined v-model="num" label="Num" type="number" />
        </div>
      </div>
      <div class="row" v-for="(num, i) in randomNumbers" :key="'ran-num-'+i">
        <div class="col-2">
          {{ num }}
        </div>
        <div class="col-2 tibetan">
          {{ toTibetanNumber(num) }}
        </div>
        <div class="col-grow" style="text-align: right;">
          <Click2Show :value="num2Text.tibetanNumberToText(num)" divClass="tibetan"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style type="text/scss">
div.numbers-input-col input {
  display: inline-block;
  width: auto;
}

.tibetan {
  font-size: 160%;
}
</style>
