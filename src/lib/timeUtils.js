import {getRandomInt,getOneTo99} from './numberUtils'

let hint_yolNas = "VERB = རེད། (all རེད་ except ཟིན་པ་ལ་)<br/>Ordinal numbers (དང་པོ་, གཉིས་པ་, ...) except for 11 & 12 (བཅུ་གཅིག་ & བཅུ་གཉིས་)"
hint_yolNas += "<br/>ཆུ་ཚོས་(དང་པོ་, གཉིས་པ་, ..., བཅུ་གཅིག་, བཅུ་གཉིས་)སྐར་མ་...རེད།"
hint_yolNas += "<br/>ད་ལྟ་ཆུ་ཚོད་དང་པོ་ཡོལ་ནས་སྐར་མ་གཅིག་རེད།"
hint_yolNas += "<br/>ད་ལྟ་ཆུ་ཚོད་བཞི་པ་ཡོལ་ནས་སྐར་མ་ཉི་ཤུ་རྩ་དྲག་རེད།"
hint_yolNas += "<br/>ད་ལྟ་ཆུ་ཚོད་བཅུ་གཉིས་ཡོད་ནས་སྐར་མ་སུམ་ཅུ་སོ་དགུ་རེད།"

let hint_dagDag = "VERB = རེད། (all རེད་ except ཟིན་པ་ལ་)<br/>Ordinal numbers (དང་པོ་, གཉིས་པ་, ...) except for 11 & 12 (བཅུ་གཅིག་ & བཅུ་གཉིས་)"
hint_dagDag += "<br/>ད་ལྟ་ཆུ་ཚོས་(དང་པོ་, གཉིས་པ་, ..., བཅུ་གཅིག་, བཅུ་གཉིས་)ཏག་ཏག་རེད།"
hint_dagDag += "<br/>ད་ལྟ་ཆུ་ཚོ༸ད་དང་པོ་ཏག་ཏག་རེད།"
hint_dagDag += "<br/>ད་ལྟ་ཆོ་ཚོད་གཉིས་པ་ཏག་ཏག་རེད།"
hint_dagDag += "<br/>ད་ལྟ་ཆུ་ཚོད་བརྒྱད་པ་ཏག་ཏག་རེད།"
hint_dagDag += "<br/>ད་ལྟ་ཆུ་ཚོད་བཅུ་གཅིག་ཏག་ཏག་རེད།"

let hint_dang = "VERB = རེད། (all རེད་ except ཟིན་པ་ལ་)<br/>Except for 1 (དང་པོ་), all cardinal numbers (གཉིས་, གསུམ་, ...)"
hint_dang += "<br/>ཆུ་ཚོད་(དང་པོ་, གཉིས་, གསུམ་, བཞི་, ...)དང་སྐར་མ་...རེད༏"
hint_dang += "<br/>ད་ལྟ་ཆུ་ཚོད་དང་པོ་དང་སྐར་མ་བཅུ་རེད།"
hint_dang += "<br/>ད་ལྟ་ཆུ་ཚོད་གསུམ་དང་སྐར་མ་བཅུ་ལྔ་རེད།"
hint_dang += "<br/>ད་ལྟ་ཆུ་ཚོད་བཅུ་གཅིག་དང་སྐར་མ་ཉི་ཤུ་རེད།"

let hint_half = "VERB = རེད། (all རེད་ except ཟིན་པ་ལ་)<br/>Except for 1 (དང་པོ་), all cardinal numbers (གཉིས་, གསུམ་, ...)"
hint_half += "<br/>ཆུ་ཚོད་(དང་པོ་, གཉིས་, གསུམ་, བཞི་, ...)དང་ཕྱེད་ཀ་རེད།"
hint_half += "<br/>ད་ལྟ་ཆུ་ཚོད་དང་པོ་དང་ཕྱེད་ཀ་རེད།"
hint_half += "<br/>ད་ལྟ་ཆུ་ཚོད་གཉིས་དང་ཕྱེད་ཀ་རེད།"
hint_half += "<br/>ད་ལྟ་ཆུ་ཚོ་བཅུ་གཅིག་པ་དང་ཕྱེད་ཀ་རེད།"
hint_half += "<br/>ད་ལྟ་ཆུ་ཚོ་བཅུ་གཉིས་པ་དང་ཕྱེད་ཀ་རེད།"

let hint_zinPar = "VERB = འདུག  (only ཟིན་པར་ uses འདུག)<br/>Ordinal numbers (དང་པོ་, གཉིས་པ་, ...) except for 11 & 12 (བཅུ་གཅིག་ & བཅུ་གཉིས་)"
hint_zinPar +="<br/>ཆུ་ཚོས་(དང་པོ་, གཉིས་པ་, ..., བཅུ་གཅིག་, བཅུ་གཉིས་)ཟིན་པར་...འདུག"
hint_zinPar += "<br/>ད་ལྟ་ཆུ་ཚོད་དང་པོ་ཟིན་པ་ལ་སྐར་མ་བཅོ་ལྔ་འདུག"
hint_zinPar += "<br/>ད་ལྟ་ཆུ་ཚོད་དྲུག་པ་ཟིན་པར་སྐར་མ་བདུན་འདུག"
hint_zinPar += "<br/>ད་ལྟ་ཆོ་ཚོད་བཅུ་གཅུག་ཟིན་པ་ལ་སྐར་མ་ཉི་ཤུ་རྩ་གསུམ་འདུག"

const hints = {
  'yolNas': hint_yolNas,
  'dagDag': hint_dagDag,
  'dang': hint_dang,
  'half': hint_half,
  'zinPar': hint_zinPar
}

function generateRandomTimeString() {
  return getRandomInt(0,12) + ":" + getRandomInt(0,5) + getRandomInt(0,9)
}

function generateRandomHour() {
  return getRandomInt(1,12)
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
  return getTimeAsText(hours,mins)
}

// all ordinal except for 11 and 12
function getAllOrdinalExcept11And12(hour) {
  if (hour < 11) {
    return ordinalNumbers[hour]
  }
  else {
    return cardinalNumbers[hour]
  }
}

function getAllCardinalExceptFirst(hour) {
  if (hour == 1) {
    return ordinalNumbers[hour]
  }
  else {
    return cardinalNumbers[hour]
  }
}

function getNextHour(hour) {
  return parseInt(hour) === 12 ? 1 : parseInt(hour) + 1
}

function getTimeAsText_yolNas(hour,mins) {
  return 'ཆུ་ཚོད་' + getAllOrdinalExcept11And12(hour) + 'ཡོལ་ནས་སྐར་མ་' + getOneTo99(parseInt(mins)) + 'རེད།'
}

function getTimeAsText_zinPar(hour,mins) {
  let nextHour = getNextHour(hour)
  if (getRandomInt(0,1) === 1) return 'ཆུ་ཚོད་' + getAllOrdinalExcept11And12(nextHour) + 'ཟིན་པ་ལ་སྐར་མ་' + getOneTo99(60-mins) + 'འདུག'
  else return 'ཆུ་ཚོད་' + getAllOrdinalExcept11And12(nextHour) + 'ཟིན་པར་སྐར་མ་' + getOneTo99(60-mins) + 'འདུག'

}

function getTimeAsText_dang(hour,mins) {
  return 'ཆུ་ཚོད་' + getAllCardinalExceptFirst(hour) + 'དང་སྐར་མ་' + getOneTo99(parseInt(mins)) + 'རེད།'
}

function getTimeAsText(hour,mins,useDang) { // dang or yol nas for time past
  if (mins == "00") {
    return {
      string:'ཆུ་ཚོད་' + getAllOrdinalExcept11And12(hour) + 'ཏག་ཏག་རེད།',
      type: 'dagDag'
    }
  }
  else if (mins == "30") {
    return {
      string:'ཆུ་ཚོད་' + getAllCardinalExceptFirst(hour) + 'དང་ཕྱེད་ཀ་རེད།',
      type:'half'
    }
  }
  else if (mins > 30) {
    return {
      string: getTimeAsText_zinPar(hour,mins),
      type: 'zinPar'
    }
  }
  else { // mins < 30
    if (useDang) {
      return {
        string: getTimeAsText_dang(hour,mins),
        type: 'dang'
      }
    }
    else return {
      string: getTimeAsText_yolNas(hour,mins),
      type: 'yolNas'
    }
  }
}

export {
  generateRandomTimeString,
  generateRandomMinutes,
  generateRandomHour,
  getTimeAsText,
  getTimeAsText_dang,
  getRandomTimeAsText,
  hints
}
