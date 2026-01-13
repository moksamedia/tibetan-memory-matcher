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

// Mode selection
const mode = ref('practice')

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
      // Add delay to ensure audio fully completes before cleanup
      setTimeout(() => {
        playingAudio.value.delete(key)
      }, 300)
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

// Listening mode state
const listeningAnswers = ref({})
const listeningRevealed = ref({})

const checkAnswer = (index, number) => {
  const userAnswer = listeningAnswers.value[index]?.trim()
  if (!userAnswer) {
    Notify.create({
      type: 'warning',
      message: 'Please enter an answer',
      position: 'top'
    })
    return
  }

  const validAnswers = num2Text.getAllVersions(number).strings
  const isCorrect = validAnswers.includes(userAnswer)

  listeningRevealed.value[index] = {
    correct: isCorrect,
    userAnswer: userAnswer,
    validAnswers: validAnswers
  }
}

const showAnswer = (index, number) => {
  const validAnswers = num2Text.getAllVersions(number).strings
  listeningRevealed.value[index] = {
    correct: null, // null means we're just showing, not checking
    userAnswer: listeningAnswers.value[index]?.trim() || '',
    validAnswers: validAnswers
  }
}

// Helper function to compare user answer with closest valid answer
const getCharacterComparison = (userAnswer, validAnswers) => {
  if (!userAnswer || !validAnswers || validAnswers.length === 0) {
    return []
  }

  // Find the closest matching valid answer
  let closestAnswer = validAnswers[0]
  let minDistance = Math.abs(userAnswer.length - validAnswers[0].length)

  for (const validAnswer of validAnswers) {
    const distance = Math.abs(userAnswer.length - validAnswer.length)
    if (distance < minDistance) {
      minDistance = distance
      closestAnswer = validAnswer
    }
  }

  // Compare character by character
  const comparison = []
  const maxLength = Math.max(userAnswer.length, closestAnswer.length)

  for (let i = 0; i < maxLength; i++) {
    const userChar = userAnswer[i] || ''
    const validChar = closestAnswer[i] || ''

    if (i < userAnswer.length) {
      comparison.push({
        char: userChar,
        correct: userChar === validChar
      })
    }
  }

  return comparison
}

</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md full-width" style="max-width: 1200px;">
      <!-- Mode Tabs -->
      <q-tabs
        v-model="mode"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
      >
        <q-tab name="practice" label="Practice" />
        <q-tab name="listening" label="Listening" />
      </q-tabs>

      <q-separator class="q-mb-md" />

      <!-- Controls (shared between modes) -->
      <div class="row q-gutter-sm q-mb-md">
        <div class="col-auto">
          <q-input
            outlined
            v-model="min"
            label="Min"
            type="number"
            min="0"
            :max="MAX_SUPPORTED_NUMBER"
            style="width: 120px"
            :rules="[
              val => val >= 0 || 'Min cannot be negative',
              val => val <= MAX_SUPPORTED_NUMBER || `Min cannot exceed ${MAX_SUPPORTED_NUMBER.toLocaleString('en-US')}`
            ]"
          />
        </div>
        <div class="col-auto">
          <q-input
            outlined
            v-model="max"
            label="Max"
            type="number"
            :max="MAX_SUPPORTED_NUMBER"
            style="width: 120px"
            :rules="[val => val <= MAX_SUPPORTED_NUMBER || `Max cannot exceed ${MAX_SUPPORTED_NUMBER.toLocaleString('en-US')}`]"
          />
        </div>
        <div class="col-auto">
          <q-input outlined v-model="num" label="Num" type="number" style="width: 100px" />
        </div>
      </div>

      <!-- Practice Mode -->
      <div v-if="mode === 'practice'" class="q-gutter-sm">
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
                  :icon="isPlayingAudio(`practice-${i}-${idx}`) ? 'volume_up' : 'volume_off'"
                  :loading="isLoadingAudio(`practice-${i}-${idx}`)"
                  @click="playAudio(num2Text.getAllVersions(num).strings[idx], `practice-${i}-${idx}`)"
                  class="audio-btn"
                >
                  <q-tooltip>Play audio</q-tooltip>
                </q-btn>
              </div>
            </Click2ShowSlot>
          </div>
        </div>
      </div>

      <!-- Listening Mode -->
      <div v-if="mode === 'listening'" class="q-gutter-md">
        <div
          v-for="(number, i) in randomNumbers"
          :key="'listen-'+i"
          class="listening-item q-pa-md"
        >
          <div class="row items-center q-gutter-md">
            <!-- Play Button -->
            <div class="col-auto">
              <q-btn
                round
                color="primary"
                :icon="isPlayingAudio(`listen-${i}`) ? 'volume_up' : 'play_arrow'"
                :loading="isLoadingAudio(`listen-${i}`)"
                @click="playAudio(num2Text.getAllVersions(number).strings[0], `listen-${i}`)"
                size="md"
              >
                <q-tooltip>Play audio</q-tooltip>
              </q-btn>
            </div>

            <!-- Answer Input -->
            <div class="col">
              <q-input
                v-model="listeningAnswers[i]"
                outlined
                label="Type your answer in Tibetan"
                class="tibetan-input"
                :disable="listeningRevealed[i]"
              />
            </div>

            <!-- Action Buttons -->
            <div class="col-auto q-gutter-sm">
              <q-btn
                color="primary"
                label="Submit"
                @click="checkAnswer(i, number)"
                :disable="listeningRevealed[i]"
              />
              <q-btn
                color="secondary"
                label="Show Answer"
                @click="showAnswer(i, number)"
                :disable="listeningRevealed[i]"
              />
            </div>
          </div>

          <!-- Feedback -->
          <div v-if="listeningRevealed[i]" class="q-mt-md">
            <!-- Result message -->
            <div v-if="listeningRevealed[i].correct !== null" class="q-mb-sm">
              <q-badge
                :color="listeningRevealed[i].correct ? 'positive' : 'negative'"
                :label="listeningRevealed[i].correct ? 'Correct!' : 'Incorrect'"
                class="q-pa-sm"
              />
            </div>

            <!-- Show the actual number -->
            <div class="q-mb-sm">
              <strong>Number:</strong> {{ formatNumber(number) }} ({{ toTibetanNumber(number) }})
            </div>

            <!-- Your answer (if submitted) -->
            <div v-if="listeningRevealed[i].userAnswer" class="q-mb-sm">
              <strong>Your answer:</strong>
              <span v-if="listeningRevealed[i].correct === true" class="tibetan">
                {{ listeningRevealed[i].userAnswer }}
              </span>
              <span v-else-if="listeningRevealed[i].correct === false" class="tibetan">
                <span
                  v-for="(charData, cIdx) in getCharacterComparison(listeningRevealed[i].userAnswer, listeningRevealed[i].validAnswers)"
                  :key="'char-'+i+'-'+cIdx"
                  :class="charData.correct ? 'char-correct' : 'char-incorrect'"
                >{{ charData.char }}</span>
              </span>
              <span v-else class="tibetan">
                {{ listeningRevealed[i].userAnswer }}
              </span>
            </div>

            <!-- Valid answers -->
            <div>
              <strong>Valid answers:</strong>
              <div class="q-mt-xs q-gutter-xs">
                <div
                  v-for="(answer, idx) in listeningRevealed[i].validAnswers"
                  :key="'answer-'+i+'-'+idx"
                  class="tibetan"
                >
                  {{ answer }}
                </div>
              </div>
            </div>
          </div>
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

// Listening mode styling
.listening-item {
  background: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.tibetan-input {
  font-size: 160%;

  :deep(input) {
    font-size: 160%;
  }
}

// Character highlighting for incorrect answers
.char-correct {
  background-color: #c8e6c9; // Light green
  color: #2e7d32; // Dark green
  padding: 2px 0;
}

.char-incorrect {
  background-color: #ffcdd2; // Light red
  color: #c62828; // Dark red
  padding: 2px 0;
}
</style>
