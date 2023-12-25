import {getRandomInt,getOneTo99} from './numberUtils'

function generateRandomTimeString() {
  return getRandomInt(0,12) + ":" + getRandomInt(0,5) + getRandomInt(0,9)
}

function generateRandomHour() {
  return getRandomInt(0,12)
}

function generateRandomMinutes() {
  let mins = getRandomInt(0,59)
  if (mins < 10) mins = "0" + mins.toString()
  return mins
}

const ordinalNumbers = {
  1: 'དང་པོ་',
  2: 'གཉིས་པ་',
  3: 'གསུམ་པ་',
  4: 'བཞི་པ་',
  5: 'ལྔ་པ་',
  6: 'དྲུག་པ་',
  7: 'བདུག་པ་',
  8: 'བརྒྱད་པ་',
  9: 'དགུ་པ་',
  10: 'བཅུ་པ་',
  11: 'བཅུ་གཅིག་པ་',
  12: 'བཅུ་གཉིས་པ་'
}

const cardinalNumbers = {
  1: 'གཅིག་',
  2: 'གཉིས་',
  3: 'གསུམ་',
  4: 'བཞི་',
  5: 'ལྔ་',
  6: 'དྲུག་',
  7: 'བདུག་',
  8: 'བརྒྱད་',
  9: 'དགུ་',
  10: 'བཅུ་',
  11: 'བཅུ་གཅིག་',
  12: 'བཅུ་གཉིས་'
}

function getHourText(hourNum) {
  return cardinalNumbers[hourNum]
}

function getRandomTimeAsText()  {
  let hour = generateRandomHour();
  let mins = generateRandomMinutes();
}

function getTimeAsText(hour,mins) {
  if (mins == "00") {
    return 'ཆུ་ཚོད་' + getHourText(hour) + 'ཏག་ཏག་རེད།'
  }
  else if (mins == "30") {
    return 'ཆུ་ཚོད་' + getHourText(hour) + 'དང་ཕྱེད་ཀ་རེད།'
  }
  else if (mins > 30) {
    let nextHour = parseInt(hour) === 12 ? 1 : parseInt(hour) + 1
    return 'ཆུ་ཚོད་' + getHourText(nextHour) + 'ཟིན་པར་སྐར་མ་' + getOneTo99(60-mins) + 'འདུག'
  }
  else { // mins < 30
    return 'ཆུ་ཚོད་' + getHourText(hour) + 'ཡོལ་ནས་སྐར་མ་' + getOneTo99(parseInt(mins)) + 'རེད།'
  }
}

export {
  generateRandomTimeString,
  generateRandomMinutes,
  generateRandomHour,
  getTimeAsText
}
