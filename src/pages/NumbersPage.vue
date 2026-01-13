<script setup>
import { defineComponent, toRaw, computed, ref } from 'vue'
import Click2Show from 'src/components/Click2Show.vue'
import Click2ShowSlot from 'src/components/Click2ShowSlot.vue'
import { storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import {
  MAX_SUPPORTED_NUMBER,
  getRandomInt,
  getArrayOfRandomInts,
  toTibetanNumber,
  Number2Text
} from 'src/lib/numberUtils'
import { tibetanAudio } from 'src/lib/tibetanAudio'

let min = ref(0)
let max = ref(1000)
let num = ref(10)

const num2Text = new Number2Text(false,false,false)

const randomNumbers = computed(() => {
  return getArrayOfRandomInts(min.value, max.value, num.value)
})

const formatNumber = (num) => {
  return num.toLocaleString('en-US')
}

// Audio state
const loadingAudio = ref(new Set())
const playingAudio = ref(new Set())

const playAudio = async (text, key) => {
  if (loadingAudio.value.has(key) || playingAudio.value.has(key)) {
    return
  }

  loadingAudio.value.add(key)

  try {
    const audio = await tibetanAudio.playAudio(text)

    loadingAudio.value.delete(key)
    playingAudio.value.add(key)

    audio.onended = () => {
      playingAudio.value.delete(key)
    }

    audio.onerror = () => {
      playingAudio.value.delete(key)
      Notify.create({
        type: 'negative',
        message: 'Error playing audio',
        position: 'top'
      })
    }
  } catch (error) {
    loadingAudio.value.delete(key)
    console.error('Audio playback error:', error)
    Notify.create({
      type: 'negative',
      message: `Failed to play audio: ${error.message}`,
      position: 'top'
    })
  }
}

const isLoadingAudio = (key) => {
  return loadingAudio.value.has(key)
}

const isPlayingAudio = (key) => {
  return playingAudio.value.has(key)
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
            <div
              v-for="(segmentGroup, idx) in num2Text.getAllVersions(num).segments"
              :key="'version-'+i+'-'+idx"
              class="tibetan-version-row"
            >
              <span class="tibetan">
                <span
                  v-for="(segment, segIdx) in segmentGroup"
                  :key="'seg-'+i+'-'+idx+'-'+segIdx"
                  :class="'order-' + segment.order"
                >{{ segment.text }}</span>
              </span>
              <q-btn
                flat
                round
                dense
                size="sm"
                :icon="isPlayingAudio(`${i}-${idx}`) ? 'volume_up' : 'volume_off'"
                :loading="isLoadingAudio(`${i}-${idx}`)"
                @click="playAudio(num2Text.getAllVersions(num).strings[idx], `${i}-${idx}`)"
                class="audio-btn"
              >
                <q-tooltip>Play audio</q-tooltip>
              </q-btn>
            </div>
          </Click2ShowSlot>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
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

// Audio button styling
.tibetan-version-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 4px;
}

.audio-btn {
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style>
