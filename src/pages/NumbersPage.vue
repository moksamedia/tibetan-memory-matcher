<script setup>
import { defineComponent, toRaw } from 'vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import {
  getRandomInt,
  getArrayOfRandomInts,
  toTibetanNumber,
  Number2Text
} from 'src/lib/utils'

let min = ref(0)
let max = ref(1000)
let num = ref(10)

const num2Text = new Number2Text(false,false,false)

let randomNumbers = ref(getArrayOfRandomInts(min.value, max.value, num.value))
console.log("randomNumbers", toRaw(randomNumbers.value))
let numbers = ref(randomNumbers.value.reduce((acc, curr) => {
  let tibNum = toTibetanNumber(curr)
  console.log(`${num} > ${tibNum}`)
  acc.push([curr, toTibetanNumber(curr), num2Text.tibetanNumberToText(curr)])
  return acc
}, []))


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
      <div class="row tib-numbers" v-for="num in numbers" :key="'ran-num-'+num">
        <div class="col-3">
          {{ num[0] }}
        </div>
        <div class="col-3">
          {{ num[1] }}
        </div>
        <div class="col-3">
          {{ num[2] }}
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

.tib-numbers {
}
</style>
