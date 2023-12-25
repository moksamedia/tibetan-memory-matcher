import { expect, test } from 'vitest'
import {
  generateRandomTimeString,
  generateRandomHour,
  generateRandomMinutes,
  getTimeAsText,
  getTimeAsText_dang
} from './timeUtils'

const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
const HOUR_REGEX = /^([0-1]?[0-9]|2[0-3])$/
const MINS_REGEX = /^([0-5][0-9])$/

test('should return time that matches regex', () => {
  for (let i=0;i<100;i++) {
    expect(generateRandomTimeString()).toMatch(TIME_REGEX)
  }
})

test('should return hour that matches regex', () => {
  for (let i=0;i<100;i++) {
    expect(generateRandomHour()).toMatch(HOUR_REGEX)
  }
})

test('should return minutes that matches regex', () => {
  for (let i=0;i<100;i++) {
    expect(generateRandomHour()).toMatch(HOUR_REGEX)
  }
})

test('should return text for exact times', () => {
  expect(getTimeAsText("11","00")).toBe('ཆུ་ཚོད་བཅུ་གཅིག་ཏག་ཏག་རེད།')
  expect(getTimeAsText("12","00")).toBe('ཆུ་ཚོད་བཅུ་གཉིས་ཏག་ཏག་རེད།')
  expect(getTimeAsText("1","00")).toBe('ཆུ་ཚོད་དང་པོ་ཏག་ཏག་རེད།')
})

test('should return text for exactly half past times', () => {
  expect(getTimeAsText("10","30")).toBe('ཆུ་ཚོད་བཅུ་དང་ཕྱེད་ཀ་རེད།')
  expect(getTimeAsText("12","30")).toBe('ཆུ་ཚོད་བཅུ་གཉིས་དང་ཕྱེད་ཀ་རེད།')
  expect(getTimeAsText("4","30")).toBe('ཆུ་ཚོད་བཞི་དང་ཕྱེད་ཀ་རེད།')
  expect(getTimeAsText("1","30")).toBe('ཆུ་ཚོད་དང་པོ་དང་ཕྱེད་ཀ་རེད།')
})

test('should return text for more than half past times', () => {
  expect(getTimeAsText("10","35")).toBe('ཆུ་ཚོད་བཅུ་གཅིག་ཟིན་པར་སྐར་མ་ཉི་ཤུ་རྩ་ལྔ་འདུག')
  expect(getTimeAsText("12","41")).toBe('ཆུ་ཚོད་དང་པོ་ཟིན་པར་སྐར་མ་བཅུ་དགུ་འདུག')
  expect(getTimeAsText("4","45")).toBe('ཆུ་ཚོད་ལྔ་པ་ཟིན་པར་སྐར་མ་བཅོ་ལྔ་འདུག')
})

test('should return text for less than half past times', () => {
  expect(getTimeAsText("7","25")).toBe('ཆུ་ཚོད་བདུག་པ་ཡོལ་ནས་སྐར་མ་ཉི་ཤུ་རྩ་ལྔ་རེད།')
  expect(getTimeAsText("12","11")).toBe('ཆུ་ཚོད་བཅུ་གཉིས་ཡོལ་ནས་སྐར་མ་བཅུ་གཅིག་རེད།')
  expect(getTimeAsText("3","08")).toBe('ཆུ་ཚོད་གསུམ་པ་ཡོལ་ནས་སྐར་མ་བརྒྱད་རེད།')
})

test('should return text for time using dang', () => {
  expect(getTimeAsText_dang("7","25")).toBe('ཆུ་ཚོད་བདུག་དང་སྐར་མ་ཉི་ཤུ་རྩ་ལྔ་རེད།')
  expect(getTimeAsText_dang("12","11")).toBe('ཆུ་ཚོད་བཅུ་གཉིས་དང་སྐར་མ་བཅུ་གཅིག་རེད།')
  expect(getTimeAsText_dang("3","08")).toBe('ཆུ་ཚོད་གསུམ་དང་སྐར་མ་བརྒྱད་རེད།')
  expect(getTimeAsText_dang("1","08")).toBe('ཆུ་ཚོད་དང་པོ་དང་སྐར་མ་བརྒྱད་རེད།')
})
