import { expect, test } from 'vitest'
import {
  getRandomInt,
  getArrayOfRandomInts,
  toTibetanNumber,
  Number2Text
} from './utils'

test('should return a random number', () => {
  expect(getRandomInt(0, 10)).toBeGreaterThanOrEqual(0).toBeLessThan(10)
})

test('array of ints', () => {
  let arrayOfInts = getArrayOfRandomInts(5,300,100)
  expect(arrayOfInts.length).toBe(100)
  arrayOfInts.forEach(i => {
    expect(i).toBeGreaterThanOrEqual(5).toBeLessThan(300)
  })
})

test('to Tibetan number', () => {
  expect(toTibetanNumber(1)).toBe('༡')
  expect(toTibetanNumber(3)).toBe('༣')
  expect(toTibetanNumber(17)).toBe('༡༧')
  expect(toTibetanNumber(1234)).toBe('༡༢༣༤')
})

const numsToCheck = [
  //[12, 'བཅུ་གཉིས་'],
  //[112, 'བརྒྱ་དང་བཅུ་གཉིས་'],
  [318, 'སུམ་བརྒྱ་དང་བཅོ་བརྒྱད་'],
  [1318, 'ཆིག་སྟོང་སུམ་བརྒྱ་བཅོ་བརྒྱད་'],
]

test('num to Tibetan text', () => {
  let num2Text = new Number2Text(false,false)
  numsToCheck.forEach(num => {
    console.log(num[0] + " - " + num[1])
    expect(num2Text.tibetanNumberToText(num[0])).toBe(num[1])
  })
  numsToCheck.forEach(num => {
    console.log(num[0] + " - " + num[1])
    expect(num2Text.tibetanNumberToText2(num[0])).toBe(num[1])
  })
})


