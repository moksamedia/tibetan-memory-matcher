<script setup>
import { defineComponent, computed, toRaw, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import * as dateUtils from 'src/lib/dateUtils'
import * as timeUtils from 'src/lib/timeUtils'
import moment from 'moment'
import { tibetanAudio } from 'src/lib/tibetanAudio'
import { compareTexts } from 'src/lib/tibetanSyllable'
import {
  toTibetanNumber,
  fromTibetanNumber,
  isTibetanNumeral,
  isWesternNumeral
} from 'src/lib/numberUtils'

const num = 10 // Fixed number of dates

const randomDates = ref([])
const hideDateDisplay = ref(false) // Toggle to hide written dates for audio-only practice

// Generate random dates
const generateRandomDates = () => {
  let acc = []
  for (let i = 0; i < num; i++) {
    let randomDate = dateUtils.randomDateInRange(new Date("Jan 1, 1900"), new Date())
    acc.push({
      date: randomDate,
      iso: moment(randomDate).format("YYYY-MM-DD"),
      formatted: moment(randomDate).format("MMM Do, YYYY"),
      tibetan: dateUtils.getFullDateAsText(randomDate),
      tibetanNumerals: dateUtils.getDateInTibetanNumerals(randomDate)
    })
  }
  randomDates.value = acc
}

// Initialize dates
generateRandomDates()

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

// Answer state
const dateAnswers = ref({})
const dateRevealed = ref({})

// Helper to check if string is a date in YYYY-M-D format
const isDateFormat = (str) => {
  return /^\d{4}-\d{1,2}-\d{1,2}$/.test(str) || /^[༠-༩]{4}-[༠-༩]{1,2}-[༠-༩]{1,2}$/.test(str)
}

// Parse date string in YYYY-M-D format and compare with correct date
const compareDateFormat = (userAnswer, correctDate) => {
  // Check if it's western numerals
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(userAnswer)) {
    const parts = userAnswer.split('-')
    const userYear = parseInt(parts[0], 10)
    const userMonth = parseInt(parts[1], 10)
    const userDay = parseInt(parts[2], 10)

    return userYear === correctDate.getFullYear() &&
           userMonth === correctDate.getMonth() + 1 &&
           userDay === correctDate.getDate()
  }

  // Check if it's Tibetan numerals
  if (/^[༠-༩]{4}-[༠-༩]{1,2}-[༠-༩]{1,2}$/.test(userAnswer)) {
    const parts = userAnswer.split('-')
    const userYear = parseInt(fromTibetanNumber(parts[0]), 10)
    const userMonth = parseInt(fromTibetanNumber(parts[1]), 10)
    const userDay = parseInt(fromTibetanNumber(parts[2]), 10)

    return userYear === correctDate.getFullYear() &&
           userMonth === correctDate.getMonth() + 1 &&
           userDay === correctDate.getDate()
  }

  return false
}

const checkAnswer = (index, dateInfo) => {
  const userAnswer = dateAnswers.value[index]?.trim()
  if (!userAnswer) {
    Notify.create({
      type: 'warning',
      message: 'Please enter an answer',
      position: 'top'
    })
    return
  }

  const correctAnswer = dateInfo.tibetan
  let isCorrect = false
  let answerType = 'long-form'

  // Check if answer is the full Tibetan text
  if (userAnswer === correctAnswer) {
    isCorrect = true
  }
  // Check if answer is a date format (western or Tibetan numerals)
  else if (isDateFormat(userAnswer)) {
    isCorrect = compareDateFormat(userAnswer, dateInfo.date)
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(userAnswer)) {
      answerType = 'western-numeral'
    } else {
      answerType = 'tibetan-numeral'
    }
  }

  dateRevealed.value[index] = {
    correct: isCorrect,
    userAnswer: userAnswer,
    correctAnswer: correctAnswer,
    answerType: answerType
  }
}

const showAnswer = (index, dateInfo) => {
  dateRevealed.value[index] = {
    correct: null, // null means we're just showing, not checking
    userAnswer: dateAnswers.value[index]?.trim() || '',
    correctAnswer: dateInfo.tibetan
  }
}

// Helper function to compare user answer with correct answer
const getCharacterComparison = (userAnswer, correctAnswer) => {
  if (!userAnswer || !correctAnswer) {
    return []
  }
  return compareTexts(userAnswer, correctAnswer)
}

// Reset state and regenerate dates
const resetPage = () => {
  dateAnswers.value = {}
  dateRevealed.value = {}
  generateRandomDates()
}

</script>
<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md full-width" style="max-width: 1200px;">
      <!-- Controls -->
      <div class="q-mb-md">
        <q-checkbox
          v-model="hideDateDisplay"
          label="Hide written dates (audio only)"
        />
      </div>

      <div class="q-gutter-md">
        <div
          v-for="(dateInfo, i) in randomDates"
          :key="'date-'+i"
          class="date-item q-pa-md"
        >
          <!-- Date display at top (hide if audio-only mode) -->
          <div v-if="!hideDateDisplay" class="row q-mb-md q-gutter-md">
            <div class="col">
              <div class="text-caption text-grey-7">English Date</div>
              <div class="text-h6">{{ dateInfo.formatted }}</div>
            </div>
            <div class="col">
              <div class="text-caption text-grey-7">Tibetan Numerals</div>
              <div class="text-h6 tibetan">{{ dateInfo.tibetanNumerals }}</div>
            </div>
          </div>

          <div class="row items-center q-gutter-md">
            <!-- Play Button -->
            <div class="col-auto">
              <q-btn
                round
                color="primary"
                :icon="isPlayingAudio(`date-${i}`) ? 'volume_up' : 'play_arrow'"
                :loading="isLoadingAudio(`date-${i}`)"
                @click="playAudio(dateInfo.tibetan, `date-${i}`)"
                size="md"
              >
                <q-tooltip>Play audio</q-tooltip>
              </q-btn>
            </div>

            <!-- Answer Input -->
            <div class="col">
              <q-input
                v-model="dateAnswers[i]"
                outlined
                :label="dateAnswers[i] ? '' : 'Type answer (Tibetan text or numerals YYYY-M-D)'"
                class="tibetan-input"
                :disable="!!dateRevealed[i]"
              />
            </div>

            <!-- Action Buttons -->
            <div class="col-auto q-gutter-sm">
              <q-btn
                color="primary"
                label="Submit"
                @click="checkAnswer(i, dateInfo)"
                :disable="!!dateRevealed[i]"
              />
              <q-btn
                color="secondary"
                label="Show Answer"
                @click="showAnswer(i, dateInfo)"
                :disable="!!dateRevealed[i]"
              />
            </div>
          </div>

          <!-- Feedback -->
          <div v-if="dateRevealed[i]" class="q-mt-md">
            <!-- Result message -->
            <div v-if="dateRevealed[i].correct !== null" class="q-mb-sm">
              <q-badge
                :color="dateRevealed[i].correct ? 'positive' : 'negative'"
                :label="dateRevealed[i].correct ? 'Correct!' : 'Incorrect'"
                class="q-pa-sm"
              />
            </div>

            <!-- Your answer (if submitted) -->
            <div v-if="dateRevealed[i].userAnswer" class="q-mb-sm">
              <strong>Your answer:</strong>
              <!-- Correct answer: show plain text -->
              <span v-if="dateRevealed[i].correct === true" class="tibetan">
                {{ dateRevealed[i].userAnswer }}
              </span>
              <!-- Incorrect answer: show with highlighting only for long-form text -->
              <span v-else-if="dateRevealed[i].correct === false">
                <!-- If it's a numeral (western or Tibetan), just show it plain -->
                <span v-if="dateRevealed[i].answerType !== 'long-form'" class="tibetan">
                  {{ dateRevealed[i].userAnswer }}
                  <span class="text-grey-7"> (date format - see long-form below)</span>
                </span>
                <!-- If it's long-form text, show character highlighting -->
                <span v-else class="tibetan">
                  <span
                    v-for="(charData, cIdx) in getCharacterComparison(dateRevealed[i].userAnswer, dateRevealed[i].correctAnswer)"
                    :key="'char-'+i+'-'+cIdx"
                    :class="charData.correct ? 'char-correct' : 'char-incorrect'"
                  >{{ charData.char }}</span>
                </span>
              </span>
              <!-- Just showing answer (not submitted) -->
              <span v-else class="tibetan">
                {{ dateRevealed[i].userAnswer }}
              </span>
            </div>

            <!-- Correct answer -->
            <div>
              <strong>Long-form answer:</strong>
              <div class="tibetan">
                {{ dateRevealed[i].correctAnswer }}
              </div>
              <div class="q-mt-sm text-grey-7">
                Also accepted: {{ dateInfo.iso }} or {{ dateInfo.tibetanNumerals }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reset Button -->
      <div class="q-mt-lg text-center">
        <q-btn
          color="primary"
          label="Generate New Dates"
          icon="refresh"
          @click="resetPage"
          size="md"
        />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.tibetan {
  font-size: 24px;
}

.date-item {
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

