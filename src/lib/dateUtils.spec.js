import { expect, test } from 'vitest'
import {
  randomDateInRange,
  getYearAsText,
  getMonthAsText,
  getFullDateAsText
 } from './dateUtils'

test('should return text for year', () => {
  expect(getYearAsText(new Date('Jan 1, 1995'))).toBe('སྤྱི་ལོ་ཆིག་སྟོང་དགུ་བརྒྱ་དགུ་བཅུ་གོ་ལྔ་ལོར་')
  expect(getYearAsText(new Date('Jan 1, 2023'))).toBe('སྤྱི་ལོ་ཉིས་སྟོང་ཉི་ཤུ་རྩ་གསུམ་ལོར་')
})

test('should return text for month', () => {
  expect(getMonthAsText(new Date('Jan 1, 1995'))).toBe('སྤྱི་ཟླ་དང་པོའི་ཚེད་པ་')
  expect(getMonthAsText(new Date('Mar 1, 2023'))).toBe('སྤྱི་ཟླ་གསུམ་པའི་ཚེད་པ་')
})

test('should return text for month', () => {
  expect(getMonthAsText(new Date('Jan 1, 1995'))).toBe('སྤྱི་ཟླ་དང་པོའི་ཚེད་པ་')
  expect(getMonthAsText(new Date('Mar 1, 2023'))).toBe('སྤྱི་ཟླ་གསུམ་པའི་ཚེད་པ་')
})

test('should return text for date', () => {
  expect(getFullDateAsText(new Date('Jan 1, 1995'))).toBe('སྤྱི་ལོ་ཆིག་སྟོང་དགུ་བརྒྱ་དགུ་བཅུ་གོ་ལྔ་ལོར་སྤྱི་ཟླ་དང་པོའི་ཚེད་པ་གཅིག་')
  expect(getFullDateAsText(new Date('Jan 2, 1995'))).toBe('སྤྱི་ལོ་ཆིག་སྟོང་དགུ་བརྒྱ་དགུ་བཅུ་གོ་ལྔ་ལོར་སྤྱི་ཟླ་དང་པོའི་ཚེད་པ་གཉིས་')
})
