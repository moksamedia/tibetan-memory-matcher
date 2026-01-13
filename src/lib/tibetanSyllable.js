// Tibetan syllable parser and comparison utilities

// Unicode ranges for Tibetan characters
const TIBETAN_RANGES = {
  consonants: [0x0F40, 0x0F6C],
  vowels: [0x0F71, 0x0F84],
  subjoined: [0x0F90, 0x0FBC],
  tsheg: 0x0F0B,
  marks: [0x0F35, 0x0F39] // Additional marks
}

// Tibetan prefixes
const PREFIXES = ['ག', 'ད', 'བ', 'མ', 'འ']

// Tibetan superscripts
const SUPERSCRIPTS = ['ར', 'ལ', 'སྲ']

// Tibetan suffixes (first suffix)
const SUFFIXES = ['ག', 'ང', 'ད', 'ན', 'བ', 'མ', 'འ', 'ར', 'ལ', 'ས']

// Post-suffixes (second suffix, can only follow certain first suffixes)
const POST_SUFFIXES = ['ས', 'ད']

/**
 * Parse a single Tibetan syllable into its components
 * @param {string} syllable - A single Tibetan syllable (without tsheg)
 * @returns {Object} - Components: {prefix, superscript, main, subjoined, vowel, suffix, postSuffix}
 */
function parseSyllable(syllable) {
  if (!syllable || syllable.length === 0) {
    return null
  }

  const chars = Array.from(syllable)
  const components = {
    prefix: '',
    superscript: '',
    main: '',
    subjoined: '',
    vowel: '',
    suffix: '',
    postSuffix: ''
  }

  let idx = 0

  // Check for prefix (only certain consonants can be prefixes)
  if (idx < chars.length && PREFIXES.includes(chars[idx])) {
    // Verify next char exists and could be a main consonant
    if (idx + 1 < chars.length) {
      const nextChar = chars[idx + 1]
      const nextCode = nextChar.charCodeAt(0)
      if (nextCode >= TIBETAN_RANGES.consonants[0] && nextCode <= TIBETAN_RANGES.consonants[1]) {
        components.prefix = chars[idx]
        idx++
      }
    }
  }

  // Check for superscript
  if (idx < chars.length && SUPERSCRIPTS.includes(chars[idx])) {
    components.superscript = chars[idx]
    idx++
  }

  // Main consonant (required)
  if (idx < chars.length) {
    const code = chars[idx].charCodeAt(0)
    if (code >= TIBETAN_RANGES.consonants[0] && code <= TIBETAN_RANGES.consonants[1]) {
      components.main = chars[idx]
      idx++
    }
  }

  // Subjoined consonants (can be multiple)
  while (idx < chars.length) {
    const code = chars[idx].charCodeAt(0)
    if (code >= TIBETAN_RANGES.subjoined[0] && code <= TIBETAN_RANGES.subjoined[1]) {
      components.subjoined += chars[idx]
      idx++
    } else {
      break
    }
  }

  // Vowel marks (can be multiple)
  while (idx < chars.length) {
    const code = chars[idx].charCodeAt(0)
    if (code >= TIBETAN_RANGES.vowels[0] && code <= TIBETAN_RANGES.vowels[1]) {
      components.vowel += chars[idx]
      idx++
    } else {
      break
    }
  }

  // Suffix (first suffix)
  if (idx < chars.length && SUFFIXES.includes(chars[idx])) {
    components.suffix = chars[idx]
    idx++
  }

  // Post-suffix (second suffix)
  if (idx < chars.length && POST_SUFFIXES.includes(chars[idx])) {
    components.postSuffix = chars[idx]
    idx++
  }

  return components
}

/**
 * Split Tibetan text into syllables
 * @param {string} text - Tibetan text
 * @returns {Array} - Array of syllable objects with text and components
 */
export function parseText(text) {
  if (!text) return []

  // Split by tsheg (་) and filter empty strings
  const syllables = text.split('་').filter(s => s.length > 0)

  return syllables.map((syllableText, index) => {
    return {
      text: syllableText,
      components: parseSyllable(syllableText),
      hasTsheg: index < syllables.length - 1 || text.endsWith('་')
    }
  })
}

/**
 * Compare two component objects
 * @param {Object} comp1 - First syllable components
 * @param {Object} comp2 - Second syllable components
 * @returns {Object} - Comparison result for each component
 */
function compareComponents(comp1, comp2) {
  if (!comp1 || !comp2) return null

  return {
    prefix: comp1.prefix === comp2.prefix,
    superscript: comp1.superscript === comp2.superscript,
    main: comp1.main === comp2.main,
    subjoined: comp1.subjoined === comp2.subjoined,
    vowel: comp1.vowel === comp2.vowel,
    suffix: comp1.suffix === comp2.suffix,
    postSuffix: comp1.postSuffix === comp2.postSuffix
  }
}

/**
 * Compare user answer with correct answer at syllable component level
 * @param {string} userText - User's answer
 * @param {string} correctText - Correct answer
 * @returns {Array} - Array of character objects with correctness info
 */
export function compareTexts(userText, correctText) {
  const userSyllables = parseText(userText)
  const correctSyllables = parseText(correctText)

  const result = []

  const maxLength = Math.max(userSyllables.length, correctSyllables.length)

  for (let i = 0; i < maxLength; i++) {
    const userSyl = userSyllables[i]
    const correctSyl = correctSyllables[i]

    if (!userSyl) {
      // Missing syllable - mark as incorrect
      if (correctSyl) {
        result.push({
          char: correctSyl.text + (correctSyl.hasTsheg ? '་' : ''),
          correct: false,
          type: 'missing'
        })
      }
      continue
    }

    if (!correctSyl) {
      // Extra syllable - mark as incorrect
      result.push({
        char: userSyl.text + (userSyl.hasTsheg ? '་' : ''),
        correct: false,
        type: 'extra'
      })
      continue
    }

    // Compare components
    const comparison = compareComponents(userSyl.components, correctSyl.components)

    // Build result by checking each component
    const userComp = userSyl.components
    const correctComp = correctSyl.components

    // Add each component with its correctness
    if (userComp.prefix || correctComp.prefix) {
      result.push({
        char: userComp.prefix || correctComp.prefix,
        correct: comparison.prefix,
        type: 'component'
      })
    }

    if (userComp.superscript || correctComp.superscript) {
      result.push({
        char: userComp.superscript || correctComp.superscript,
        correct: comparison.superscript,
        type: 'component'
      })
    }

    if (userComp.main || correctComp.main) {
      result.push({
        char: userComp.main || correctComp.main,
        correct: comparison.main,
        type: 'component'
      })
    }

    if (userComp.subjoined || correctComp.subjoined) {
      // Handle multiple subjoined characters
      const maxSub = Math.max(userComp.subjoined.length, correctComp.subjoined.length)
      for (let j = 0; j < maxSub; j++) {
        const userSubChar = userComp.subjoined[j] || ''
        const correctSubChar = correctComp.subjoined[j] || ''
        result.push({
          char: userSubChar || correctSubChar,
          correct: userSubChar === correctSubChar,
          type: 'component'
        })
      }
    }

    if (userComp.vowel || correctComp.vowel) {
      // Handle multiple vowel marks
      const maxVow = Math.max(userComp.vowel.length, correctComp.vowel.length)
      for (let j = 0; j < maxVow; j++) {
        const userVowChar = userComp.vowel[j] || ''
        const correctVowChar = correctComp.vowel[j] || ''
        result.push({
          char: userVowChar || correctVowChar,
          correct: userVowChar === correctVowChar,
          type: 'component'
        })
      }
    }

    if (userComp.suffix || correctComp.suffix) {
      result.push({
        char: userComp.suffix || correctComp.suffix,
        correct: comparison.suffix,
        type: 'component'
      })
    }

    if (userComp.postSuffix || correctComp.postSuffix) {
      result.push({
        char: userComp.postSuffix || correctComp.postSuffix,
        correct: comparison.postSuffix,
        type: 'component'
      })
    }

    // Add tsheg if present
    if (userSyl.hasTsheg || correctSyl.hasTsheg) {
      result.push({
        char: '་',
        correct: userSyl.hasTsheg === correctSyl.hasTsheg,
        type: 'tsheg'
      })
    }
  }

  return result
}
