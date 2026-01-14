<script setup>
import { defineComponent, toRaw, computed, ref, watch } from 'vue'
import Click2Show from 'src/components/Click2Show.vue'
import Click2ShowSlot from 'src/components/Click2ShowSlot.vue'
import { storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import {
  MAX_SUPPORTED_NUMBER,
  getRandomInt,
  getArrayOfRandomInts,
  toTibetanNumber,
  fromTibetanNumber,
  isTibetanNumeral,
  isWesternNumeral,
  Number2Text
} from 'src/lib/numberUtils'
import { tibetanAudio } from 'src/lib/tibetanAudio'
import { compareTexts } from 'src/lib/tibetanSyllable'

// Mode selection
const mode = ref('speaking')

// Load persisted values from localStorage or use defaults
const loadPersistedValue = (key, defaultValue) => {
  const stored = localStorage.getItem(key)
  return stored !== null ? parseInt(stored, 10) : defaultValue
}

let min = ref(loadPersistedValue('tibetan-numbers-min', 0))
let max = ref(loadPersistedValue('tibetan-numbers-max', 1000))
let num = ref(loadPersistedValue('tibetan-numbers-num', 10))

// Watch for changes and persist to localStorage
watch(min, (newValue) => {
  localStorage.setItem('tibetan-numbers-min', newValue.toString())
})

watch(max, (newValue) => {
  localStorage.setItem('tibetan-numbers-max', newValue.toString())
})

watch(num, (newValue) => {
  localStorage.setItem('tibetan-numbers-num', newValue.toString())
})

// Local saving toggle
const saveAudioLocally = ref(false)

// Watch for changes to saveAudioLocally and update the service
watch(saveAudioLocally, (newValue) => {
  if (newValue) {
    tibetanAudio.enableLocalSaving()
  } else {
    tibetanAudio.disableLocalSaving()
  }
})

const num2Text = new Number2Text(false,false,false)

const randomNumbers = computed(() => {
  return getArrayOfRandomInts(min.value, max.value, num.value)
})

const formatNumber = (num) => {
  return num.toLocaleString('en-US')
}

// Speaking mode state
const speakingRevealed = ref({})

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

// Reveal western numeral in speaking mode
const revealSpeakingNumber = (index) => {
  speakingRevealed.value[index] = true
}

// Play audio for listening mode, cycling through versions
const playListeningAudio = async (number, index) => {
  const versions = num2Text.getAllVersions(number).strings

  // Initialize version index if not set
  if (listeningVersionIndex.value[index] === undefined) {
    listeningVersionIndex.value[index] = 0
  }

  const currentVersion = versions[listeningVersionIndex.value[index]]
  const key = `listen-${index}`

  // Play the audio
  await playAudio(currentVersion, key)

  // Cycle to next version for next play
  listeningVersionIndex.value[index] = (listeningVersionIndex.value[index] + 1) % versions.length
}

// Listening mode state
const listeningAnswers = ref({})
const listeningRevealed = ref({})
const listeningVersionIndex = ref({})

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
  let isCorrect = false

  // Check if answer is a valid long-form text
  if (validAnswers.includes(userAnswer)) {
    isCorrect = true
  }
  // Check if answer is western numerals
  else if (isWesternNumeral(userAnswer)) {
    const userNum = parseInt(userAnswer, 10)
    isCorrect = userNum === number
  }
  // Check if answer is Tibetan numerals
  else if (isTibetanNumeral(userAnswer)) {
    const westernNum = fromTibetanNumber(userAnswer)
    if (westernNum !== null) {
      const userNum = parseInt(westernNum, 10)
      isCorrect = userNum === number
    }
  }

  listeningRevealed.value[index] = {
    correct: isCorrect,
    userAnswer: userAnswer,
    validAnswers: validAnswers,
    answerType: isWesternNumeral(userAnswer) ? 'western-numeral' :
                isTibetanNumeral(userAnswer) ? 'tibetan-numeral' :
                'long-form'
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

// Helper function to compare user answer with closest valid answer using syllable analysis
const getCharacterComparison = (userAnswer, validAnswers) => {
  if (!userAnswer || !validAnswers || validAnswers.length === 0) {
    return []
  }

  // Find the closest matching valid answer (by length)
  let closestAnswer = validAnswers[0]
  let minDistance = Math.abs(userAnswer.length - validAnswers[0].length)

  for (const validAnswer of validAnswers) {
    const distance = Math.abs(userAnswer.length - validAnswer.length)
    if (distance < minDistance) {
      minDistance = distance
      closestAnswer = validAnswer
    }
  }

  // Use syllable-based comparison for more accurate feedback
  return compareTexts(userAnswer, closestAnswer)
}

// Tibetan numerals for input buttons
const tibetanNumerals = ['༠', '༡', '༢', '༣', '༤', '༥', '༦', '༧', '༨', '༩']

// Append a numeral to the answer input
const appendNumeral = (index, numeral) => {
  if (!listeningAnswers.value[index]) {
    listeningAnswers.value[index] = ''
  }
  listeningAnswers.value[index] += numeral
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
        <q-tab name="speaking" label="Speaking" />
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
        <div class="col-auto flex items-center">
          <q-checkbox
            v-model="saveAudioLocally"
            label="Save audio files locally"
          />
        </div>
      </div>

      <!-- Speaking Mode -->
      <div v-if="mode === 'speaking'" class="q-gutter-sm">
        <div class="row items-center" v-for="(num, i) in randomNumbers" :key="'ran-num-'+i">
          <div class="col-2 numeral-column">
            <q-btn
              v-if="!speakingRevealed[i]"
              flat
              dense
              @click="revealSpeakingNumber(i)"
              class="reveal-btn"
              label="Show"
            >
              <q-tooltip>Show western numeral</q-tooltip>
            </q-btn>
            <span v-else class="western-numeral">{{ formatNumber(num) }}</span>
          </div>
          <div class="col-2 tibetan numeral-column">
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
                  :icon="isPlayingAudio(`speaking-${i}-${idx}`) ? 'volume_up' : 'volume_off'"
                  :loading="isLoadingAudio(`speaking-${i}-${idx}`)"
                  @click="playAudio(num2Text.getAllVersions(num).strings[idx], `speaking-${i}-${idx}`)"
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
                @click="playListeningAudio(number, i)"
                size="md"
              >
                <q-tooltip>Play audio (cycles through versions)</q-tooltip>
              </q-btn>
            </div>

            <!-- Answer Input -->
            <div class="col">
              <q-input
                v-model="listeningAnswers[i]"
                outlined
                :label="listeningAnswers[i] ? '' : 'Type your answer in Tibetan'"
                class="tibetan-input"
                :disable="!!listeningRevealed[i]"
              />
            </div>

            <!-- Action Buttons -->
            <div class="col-auto q-gutter-sm">
              <q-btn
                color="primary"
                label="Submit"
                @click="checkAnswer(i, number)"
                :disable="!!listeningRevealed[i]"
              />
              <q-btn
                color="secondary"
                label="Show Answer"
                @click="showAnswer(i, number)"
                :disable="!!listeningRevealed[i]"
              />
            </div>
          </div>

          <!-- Tibetan Numeral Input Buttons -->
          <div v-if="!listeningRevealed[i]" class="q-mt-sm q-ml-md">
            <div class="text-caption text-grey-7 q-mb-xs">Tibetan numerals:</div>
            <div class="numeral-buttons">
              <q-btn
                v-for="(numeral, idx) in tibetanNumerals"
                :key="'numeral-'+i+'-'+idx"
                flat
                dense
                size="xl"
                class="tibetan-numeral-btn"
                @click="appendNumeral(i, numeral)"
              >
                {{ numeral }}
              </q-btn>
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
              <!-- Correct answer: show plain text -->
              <span v-if="listeningRevealed[i].correct === true" class="tibetan">
                {{ listeningRevealed[i].userAnswer }}
              </span>
              <!-- Incorrect answer: show with highlighting only for long-form text -->
              <span v-else-if="listeningRevealed[i].correct === false">
                <!-- If it's a numeral (western or Tibetan), just show it plain -->
                <span v-if="listeningRevealed[i].answerType !== 'long-form'" class="tibetan">
                  {{ listeningRevealed[i].userAnswer }}
                  <span class="text-grey-7"> (numeric answer - see valid long-form below)</span>
                </span>
                <!-- If it's long-form text, show character highlighting -->
                <span v-else class="tibetan">
                  <span
                    v-for="(charData, cIdx) in getCharacterComparison(listeningRevealed[i].userAnswer, listeningRevealed[i].validAnswers)"
                    :key="'char-'+i+'-'+cIdx"
                    :class="charData.correct ? 'char-correct' : 'char-incorrect'"
                  >{{ charData.char }}</span>
                </span>
              </span>
              <!-- Just showing answer (not submitted) -->
              <span v-else class="tibetan">
                {{ listeningRevealed[i].userAnswer }}
              </span>
            </div>

            <!-- Valid answers -->
            <div>
              <strong>Valid long-form answers:</strong>
              <div class="q-mt-xs q-gutter-xs">
                <div
                  v-for="(answer, idx) in listeningRevealed[i].validAnswers"
                  :key="'answer-'+i+'-'+idx"
                  class="tibetan"
                >
                  {{ answer }}
                </div>
              </div>
              <div class="q-mt-sm text-grey-7">
                Also accepted: {{ number }} or {{ toTibetanNumber(number) }}
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

// Speaking mode styling
.numeral-column {
  display: flex;
  align-items: center;
  min-height: 40px;
}

.western-numeral {
  font-size: 24px;
  font-weight: 500;
}

.reveal-btn {
  justify-content: flex-start;

  &:hover {
    background-color: #f0f0f0;
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

// Numeral input buttons
.numeral-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tibetan-numeral-btn {
  font-size: 20px;
  min-width: 40px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
