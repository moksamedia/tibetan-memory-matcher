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
  [1, 'གཅིག་'],
  [4, 'བཞི་'],
  [6, 'དྲུག་'],
  [12, 'བཅུ་གཉིས་'],
  [112, 'བརྒྱ་དང་བཅུ་གཉིས་'],
  [318, 'སུམ་བརྒྱ་དང་བཅོ་བརྒྱད་'],
  [1318, 'ཆིག་སྟོང་སུམ་བརྒྱ་བཅོ་བརྒྱད་'],
  [108, 'བརྒྱ་དང་བཅུ་མེད་བརྒྱད་'],
  [1080, 'ཆིག་སྟོང་བརྒྱ་མེད་བརྒྱད་བཅུ་'],
  ['0082', 'སྟོང་མེད་བརྒྱ་མེད་བརྒྱད་བཅུ་གྱ་གཉིས་'],
  ['100000', 'འབུམ་གཅིག་'],
  [70000, 'བདུན་ཁྲི་'],
  [123709, 'འབུམ་གཅིག་ཉིས་ཁྲི་སུམ་སྟོང་བདུན་བརྒྱ་བཅུ་མེད་དགུ་'],
  [101800, 'འབུམ་གཅིག་ཁྲི་མེད་ཆིག་སྟོང་བརྒྱད་བརྒྱ་']
]

const numsToCheckNoNots = [
  [1, 'གཅིག་'],
  [4, 'བཞི་'],
  [6, 'དྲུག་'],
  [12, 'བཅུ་གཉིས་'],
  [112, 'བརྒྱ་དང་བཅུ་གཉིས་'],
  [318, 'སུམ་བརྒྱ་དང་བཅོ་བརྒྱད་'],
  [1318, 'ཆིག་སྟོང་སུམ་བརྒྱ་བཅོ་བརྒྱད་'],
  [108, 'བརྒྱ་དང་བརྒྱད་'],
  [1080, 'ཆིག་སྟོང་བརྒྱད་བཅུ་'],
  ['0082', 'བརྒྱད་བཅུ་གྱ་གཉིས་'],
  ['100000', 'འབུམ་གཅིག་'],
  [70000, 'བདུན་ཁྲི་'],
  [123709, 'འབུམ་གཅིག་ཉིས་ཁྲི་སུམ་སྟོང་བདུན་བརྒྱ་དགུ་'],
  [101800, 'འབུམ་གཅིག་ཆིག་སྟོང་བརྒྱད་བརྒྱ་']
]


test('num to Tibetan text', () => {
  let num2Text = new Number2Text(false,false,true)
  numsToCheck.forEach(num => {
    console.log(num[0] + " - " + num[1])
    expect(num2Text.tibetanNumberToText(num[0])).toBe(num[1])
  })
  num2Text = new Number2Text(false,false,false)
  numsToCheckNoNots.forEach(num => {
    console.log(num[0] + " - " + num[1])
    expect(num2Text.tibetanNumberToText(num[0])).toBe(num[1])
  })
})
