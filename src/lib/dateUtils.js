import * as numberUtils from './numberUtils'

const num2Text = new numberUtils.Number2Text(false, false, false)

function randomDateInRange(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getYearAsText(date) {
  const yearAsText = num2Text.tibetanNumberToText(date.getFullYear())
  const result = 'སྤྱི་ལོ་' + yearAsText + 'ལོར་'
  return result
}

const months2Text = {
  1: 'དང་པོའི་',
  2: 'གཉིས་པའི་',
  3: 'གསུམ་པའི་',
  4: 'བཞི་པའི་',
  5: 'ལྔ་པའི་',
  6: 'དྲུག་པའི་',
  7: 'བདུག་པའི་',
  8: 'བརྒྱད་པའི་',
  9: 'དགུ་པའི་',
  10: 'བཅུ་པའི་',
  11: 'བཅུ་གཅིག་པའི་',
  12: 'བཅུ་གཉིས་པའི་'
}

function getMonthAsText(date) {
  const monthAsText = months2Text[date.getMonth() + 1]
  const result = 'སྤྱི་ཟླ་' + monthAsText + 'ཚེད་པ་'
  return result
}

function getDayAsText(date) {
  return num2Text.tibetanNumberToText(date.getDate())
}

function getFullDateAsText(date) {
  return getYearAsText(date) + getMonthAsText(date) + getDayAsText(date)
}

export {
  randomDateInRange,
  getYearAsText,
  getMonthAsText,
  getFullDateAsText
}
