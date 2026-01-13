<script setup>
import { defineComponent, toRaw, computed } from 'vue'
import Click2Show from 'src/components/Click2Show.vue'
import Click2ShowSlot from 'src/components/Click2ShowSlot.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import {
  MAX_SUPPORTED_NUMBER,
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

const formatNumber = (num) => {
  return num.toLocaleString('en-US')
}

</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-sm grid-container q-gutter-sm">
      <div class="row">
        <div class="col-2 numbers-input-col">
          <q-input
            outlined
            v-model="min"
            label="Min"
            type="number"
            min="0"
            :max="MAX_SUPPORTED_NUMBER"
            :rules="[
              val => val >= 0 || 'Min cannot be negative',
              val => val <= MAX_SUPPORTED_NUMBER || `Min cannot exceed ${MAX_SUPPORTED_NUMBER.toLocaleString('en-US')}`
            ]"
          />
        </div>
        <div class="col-2 numbers-input-col">
          <q-input
            outlined
            v-model="max"
            label="Max"
            type="number"
            :max="MAX_SUPPORTED_NUMBER"
            :rules="[val => val <= MAX_SUPPORTED_NUMBER || `Max cannot exceed ${MAX_SUPPORTED_NUMBER.toLocaleString('en-US')}`]"
          />
        </div>
        <div class="col-2 numbers-input-col">
          <q-input outlined v-model="num" label="Num" type="number" />
        </div>
      </div>
      <div class="row" v-for="(num, i) in randomNumbers" :key="'ran-num-'+i">
        <div class="col-2">
          {{ formatNumber(num) }}
        </div>
        <div class="col-2 tibetan">
          {{ toTibetanNumber(num) }}
        </div>
        <div class="col-grow" style="text-align: right;">
          <Click2ShowSlot>
            <div v-for="(segmentGroup, idx) in num2Text.getAllVersions(num).segments" :key="'version-'+i+'-'+idx" class="tibetan">
              <span
                v-for="(segment, segIdx) in segmentGroup"
                :key="'seg-'+i+'-'+idx+'-'+segIdx"
                :class="'order-' + segment.order"
              >{{ segment.text }}</span>
            </div>
          </Click2ShowSlot>
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
  font-size: 24px;
}

// Subtle color coding for different orders of magnitude
.order-dungphyur {
  color: #9b59b6; // Purple
}

.order-byeba {
  color: #3498db; // Blue
}

.order-saya {
  color: #1abc9c; // Teal
}

.order-bum {
  color: #27ae60; // Green
}

.order-tenthousands {
  color: #95a5a6; // Cool gray
}

.order-thousands {
  color: #e67e22; // Orange
}

.order-hundreds {
  color: #f39c12; // Amber
}

.order-tens-ones, .order-ones {
  color: #7f8c8d; // Gray
}

.order-zero {
  color: #34495e; // Dark gray
}
</style>
