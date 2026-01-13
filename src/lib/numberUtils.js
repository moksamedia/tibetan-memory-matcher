
const oneToNineteen = {
  '1': 'གཅིག་',
  '2': 'གཉིས་',
  '3': 'གསུམ་',
  '4': 'བཞི་',
  '5': 'ལྔ་',
  '6': 'དྲུག་',
  '7': 'བདུན་',
  '8': 'བརྒྱད་',
  '9': 'དགུ་',
  '10': 'བཅུ་',
  '11': 'བཅུ་གཅིག་',
  '12': 'བཅུ་གཉིས་',
  '13': 'བཅུ་གསུམ་',
  '14': 'བཅུ་བཞི་',
  '15': 'བཅོ་ལྔ་',
  '16': 'བཅུ་དྲུག་',
  '17': 'བཅུ་བདུན་',
  '18': 'བཅོ་བརྒྱད་',
  '19': 'བཅུ་དགུ་',
}

const hundreds = {
  '100': 'བརྒྱ་',
  '200': 'ཉིས་བརྒྱ་',
  '300': 'སུམ་བརྒྱ་',
  '400': 'བཞི་བརྒྱ་',
  '500': 'ལྔ་བརྒྱ་',
  '600': 'དྲུག་བརྒྱུ་',
  '700': 'བདུན་བརྒྱ་',
  '800': 'བརྒྱད་བརྒྱ་',
  '900': 'དགུ་བརྒྱ་'
}

const hundredsPhrag = {
  '100': 'བརྒྱ་ཕྲག་གཅིག་',
  '200': 'བརྒྱ་ཕྲག་ཉིས་',
  '300': 'བརྒྱ་ཕྲག་སུམ་',
  '400': 'བརྒྱ་ཕྲག་བཞི་',
  '500': 'བརྒྱ་ཕྲག་ལྔ་',
  '600': 'བརྒྱ་ཕྲག་དྲུག་',
  '700': 'བརྒྱ་ཕྲག་བདུན་',
  '800': 'བརྒྱ་ཕྲག་བརྒྱད་',
  '900': 'བརྒྱ་ཕྲག་དགུ་'
}

const thousands = {
  '1000': 'ཆིག་སྟོང་',
  '2000': 'ཉིས་སྟོང་',
  '3000': 'སུམ་སྟོང་',
  '4000': 'བཞི་སྟོང་',
  '5000': 'ལྔ་སྟོང་',
  '6000': 'དྲུག་སྟོང་',
  '7000': 'བདུན་སྟོང་',
  '8000': 'བརྒྱད་སྟོང་',
  '9000': 'དགུ་སྟོང་',
}

const thousandsPhrag = {
  '1000': 'སྟོང་ཕྲག་གཅིག་',
  '2000': 'སྟོང་ཕྲག་ཉིས་',
  '3000': 'སྟོང་ཕྲག་སུམ་',
  '4000': 'སྟོང་ཕྲག་བཞི་',
  '5000': 'སྟོང་ཕྲག་ལྔ་',
  '6000': 'སྟོང་ཕྲག་དྲུག་',
  '7000': 'སྟོང་ཕྲག་བདུན་',
  '8000': 'སྟོང་ཕྲག་བརྒྱད་',
  '9000': 'སྟོང་ཕྲག་དགུ་',
}

const thousandsReversed = {
  '1000': 'སྟོང་གཅིག་',
  '2000': 'སྟོང་གཉིས་',
  '3000': 'སྟོང་གསུམ་',
  '4000': 'སྟོང་བཞི་',
  '5000': 'སྟོང་ལྔ་',
  '6000': 'སྟོང་དྲུག་',
  '7000': 'སྟོང་བདུན་',
  '8000': 'སྟོང་བརྒྱད་',
  '9000': 'སྟོང་དགུ་',
}

const tenthousands = {
  '10000': 'ཆིག་ཁྲི་',
  '20000': 'ཉིས་ཁྲི་',
  '30000': 'སུམ་ཁྲི',
  '40000': 'བཞི་ཁྲི',
  '50000': 'ལྔ་ཁྲི་',
  '60000': 'དྲུག་ཁྲི་',
  '70000': 'བདུན་ཁྲི་',
  '80000': 'བརྒྱད་ཁྲི་',
  '90000': 'དགུ་ཁྲི་',
}

const tenthousandsPhrag = {
  '10000': 'ཁྲི་ཕྲག་གཅིག་',
  '20000': 'ཁྲི་ཕྲག་ཉིས་',
  '30000': 'ཁྲི་ཕྲག་སུམ་',
  '40000': 'ཁྲི་ཕྲག་བཞི་',
  '50000': 'ཁྲི་ཕྲག་ལྔ་',
  '60000': 'ཁྲི་ཕྲག་དྲུག་',
  '70000': 'ཁྲི་ཕྲག་བདུན་',
  '80000': 'ཁྲི་ཕྲག་བརྒྱད་',
  '90000': 'ཁྲི་ཕྲག་དགུ་',
}

const tenthousandsReversed = {
  '10000': 'ཁྲི་གཅིག་',
  '20000': 'ཁྲི་གཉིས་',
  '30000': 'ཁྲི་གསུམ་',
  '40000': 'ཁྲི་བཞི་',
  '50000': 'ཁྲི་ལྔ་',
  '60000': 'ཁྲི་དྲུག་',
  '70000': 'ཁྲི་བདུན་',
  '80000': 'ཁྲི་བརྒྱད་',
  '90000': 'ཁྲི་དགུ་',
}

const bum = {
  '100000': 'འབུམ་གཅིག་',
  '200000': 'འབུམ་གཉིས་',
  '300000': 'འབུམ་གསུམ་',
  '400000': 'འབུམ་བཞི་',
  '500000': 'འབུམ་ལྔ་',
  '600000': 'འབུམ་དྲུག་',
  '700000': 'འབུམ་བདུན་',
  '800000': 'འབུམ་བརྒྱད་',
  '900000': 'འབུམ་དགུ་',
}

const bumPhrag = {
  '100000': 'འབུམ་ཕྲག་གཅིག་',
  '200000': 'འབུམ་ཕྲག་གཉིས་',
  '300000': 'འབུམ་ཕྲག་གསུམ་',
  '400000': 'འབུམ་ཕྲག་བཞི་',
  '500000': 'འབུམ་ཕྲག་ལྔ་',
  '600000': 'འབུམ་ཕྲག་དྲུག་',
  '700000': 'འབུམ་ཕྲག་བདུན་',
  '800000': 'འབུམ་ཕྲག་བརྒྱད་',
  '900000': 'འབུམ་ཕྲག་དགུ་',
}

function getOneTo99(num) {

  function getOneToNineteen(num) {
    if (oneToNineteen[num]) {
      return oneToNineteen[num]
    }
    else {
      throw Error("oneToNineteen value not found: " + num)
    }
  }

  function getTwentyTo99(num) {

    // for zero, this add blank
    const zeroToNine = {
      '1': 'གཅིག་',
      '2': 'གཉིས་',
      '3': 'གསུམ་',
      '4': 'བཞི་',
      '5': 'ལྔ་',
      '6': 'དྲུག་',
      '7': 'བདུན་',
      '8': 'བརྒྱད་',
      '9': 'དགུ་',
      '0': ''
    }

    const lastDigit = zeroToNine[num % 10]

    if (num >= 20 && num < 30) {
      return num === 20 ? 'ཉི་ཤུ་': 'ཉི་ཤུ་རྩ་' + lastDigit
    }
    else if (num >= 30 && num < 40) {
      return num === 30 ? 'སུམ་བུ་' : 'སུམ་ཅུ་སོ་' + lastDigit
    }
    else if (num >= 40 && num < 50) {
      return num === 40 ? 'བཞི་བཅུ་' : 'བཞི་བཅུ་ཞེ་' + lastDigit
    }
    else if (num >= 50 && num < 60) {
      return num === 50 ? 'ལྔ་བཅུ་' : 'ལྔ་བཅུ་ང་' + lastDigit
    }
    else if (num >= 60 && num < 70) {
      return num === 60 ? 'དྲུག་ཅུ་' : 'དྲུག་ཅུ་རེ་' + lastDigit
    }
    else if (num >= 70 && num < 80) {
      return num === 70 ? 'བདུན་ཅུ་' : 'བདུན་ཅུ་དོན་' + lastDigit
    }
    else if (num >= 80 && num < 90) {
      return num === 80 ? 'བརྒྱད་བཅུ་' : 'བརྒྱད་བཅུ་གྱ་' + lastDigit
    }
    else if (num >= 90 && num < 100) {
      return num === 90 ? 'དགུ་བཅུ་' : 'དགུ་བཅུ་གོ་' + lastDigit
    }
    else {
      throw Error ("getTwentyTo99 value not found: " + num)
    }
  }

  if (num >= 20 && num < 100) {
    return getTwentyTo99(num)
  }
  else if (num < 20 && num > 0) {
    return getOneToNineteen(num)
  }

}

const Number2Text = class {

  constructor(reverseThousands,reverseTenthousands,useNots) {
    this.reverseTenthousands = reverseTenthousands
    this.reverseThousands = reverseThousands
    this.useNots = useNots
  }

  getOneToNineteen(num) {
    if (oneToNineteen[num]) {
      return oneToNineteen[num]
    }
    else {
      throw Error("oneToNineteen value not found: " + num)
    }
  }

  getTwentyTo99(num) {

    // for zero, this add blank
    const zeroToNine = {
      '1': 'གཅིག་',
      '2': 'གཉིས་',
      '3': 'གསུམ་',
      '4': 'བཞི་',
      '5': 'ལྔ་',
      '6': 'དྲུག་',
      '7': 'བདུན་',
      '8': 'བརྒྱད་',
      '9': 'དགུ་',
      '0': ''
    }

    const lastDigit = zeroToNine[num % 10]

    if (num >= 20 && num < 30) {
      return num === 20 ? 'ཉི་ཤུ་': 'ཉི་ཤུ་རྩ་' + lastDigit
    }
    else if (num >= 30 && num < 40) {
      return num === 30 ? 'སུམ་བུ་' : 'སུམ་ཅུ་སོ་' + lastDigit
    }
    else if (num >= 40 && num < 50) {
      return num === 40 ? 'བཞི་བཅུ་' : 'བཞི་བཅུ་ཞེ་' + lastDigit
    }
    else if (num >= 50 && num < 60) {
      return num === 50 ? 'ལྔ་བཅུ་' : 'ལྔ་བཅུ་ང་' + lastDigit
    }
    else if (num >= 60 && num < 70) {
      return num === 60 ? 'དྲུག་ཅུ་' : 'དྲུག་ཅུ་རེ་' + lastDigit
    }
    else if (num >= 70 && num < 80) {
      return num === 70 ? 'བདུན་ཅུ་' : 'བདུན་ཅུ་དོན་' + lastDigit
    }
    else if (num >= 80 && num < 90) {
      return num === 80 ? 'བརྒྱད་བཅུ་' : 'བརྒྱད་བཅུ་གྱ་' + lastDigit
    }
    else if (num >= 90 && num < 100) {
      return num === 90 ? 'དགུ་བཅུ་' : 'དགུ་བཅུ་གོ་' + lastDigit
    }
    else {
      throw Error ("getTwentyTo99 value not found: " + num)
    }

  }

  getHundreds(num) {
    if (hundreds[num]) {
      return hundreds[num]
    }
    else {
      throw Error("Hundreds value not found: " + num)
    }
  }

  getThousands(num) {
    if (thousands[num]) {
      return thousands[num]
    }
    else {
      throw Error("Thousands value not found")
    }
  }

  getTenThousands(num) {
    if (tenthousands[num]) {
      return tenthousands[num]
    }
    else {
      throw Error("Ten-thousands value not found")
    }
  }

  getBum(num) {
    if (bum[num]) {
      return bum[num]
    }
    else {
      throw Error("Hundred-thousands value not found")
    }
  }

  tibetanNumberToText(num) {
    console.log("tibetanNumberToText num:" + num)
    let numInt = Number.isInteger(num) ? num : parseInt(num) // ensure Integer
    let numString = typeof num === 'string' ? num : num.toString()  // ensure String
    let length = numString.length
    if (length > 6) {
      throw Error("Number too big")
    }
    let acc = ''
    if (length >= 6) {
      let bum = numString[length-6] * 100000
      //console.log('bum:' + bum)
      acc += this.getBum(bum)
      if (num % 100000 === 0) return acc
    }
    if (length >= 5) {
      let tenthousands = numString[length-5] * 10000
      //console.log('tenthousands:' + tenthousands)
      if (tenthousands === 0) {
        if (this.useNots) acc += 'ཁྲི་མེད་'
      }
      else {
        acc += this.getTenThousands(tenthousands)
      }
      if (num % 10000 === 0) return acc
    }
    if (length >= 4) {
      let thousands = numString[length-4] * 1000
      console.log('thousands:' + thousands)
      if (thousands === 0) {
        if (this.useNots) acc += 'སྟོང་མེད་'
      }
      else {
        acc += this.getThousands(thousands)
      }
      if (num % 1000 === 0) return acc
    }
    if (length >= 3) {
      let hundreds = numString[length-3] * 100 // hundreds is third from the end (i.e., length) and * 100
      if (hundreds === 0) {
        if (this.useNots) acc += 'བརྒྱ་མེད་'
      }
      else {
        acc += this.getHundreds(hundreds)
        if (num % 100 === 0) return acc
        if (numInt < 1000) acc += 'དང་'
      }
    }
    if (length >= 2) {
      let tens = numInt % 100 // whole number below 100, such as 34, 98, 21, ...
      if (tens >= 20) {
        acc += this.getTwentyTo99(tens)
      }
      else {
        if (numString[length - 2] === '0' && this.useNots) acc += 'བཅུ་མེད་'
        acc += this.getOneToNineteen(tens)
      }
    }
    if (length == 1) {
      if (num === 0) return 'ཀླད་སྐོར་'
      acc += this.getOneToNineteen(num)
    }
    return acc
  }

  getAllVersions(num) {
    let numInt = Number.isInteger(num) ? num : parseInt(num)
    let numString = typeof num === 'string' ? num : num.toString()
    let length = numString.length

    if (numInt === 0) {
      return ['ཀླད་སྐོར་']
    }

    if (length > 6) {
      throw Error("Number too big")
    }

    // Helper to build the remainder with standard forms only
    const buildRemainder = (remainder, hasHigherThanHundreds) => {
      if (remainder === 0) return ''

      let remString = remainder.toString()
      let remLength = remString.length
      let acc = ''

      // Thousands (standard only)
      if (remLength >= 4) {
        let thousandsVal = parseInt(remString[remLength-4]) * 1000
        if (thousandsVal > 0) {
          acc += this.getThousands(thousandsVal)
        }
        if (remainder % 1000 === 0) return acc
      }

      // Hundreds (standard only)
      if (remLength >= 3) {
        let hundredsVal = parseInt(remString[remLength-3]) * 100
        if (hundredsVal > 0) {
          acc += this.getHundreds(hundredsVal)
          if (remainder % 100 === 0) return acc
          // དང་ only if no higher orders
          if (!hasHigherThanHundreds) {
            acc += 'དང་'
          }
        }
      }

      // Tens and ones
      let tensOnes = remainder % 100
      if (tensOnes > 0) {
        if (tensOnes >= 20) {
          acc += this.getTwentyTo99(tensOnes)
        } else {
          acc += this.getOneToNineteen(tensOnes)
        }
      }

      return acc
    }

    // Hundred-thousands (bum) - standard and phrag
    if (length >= 6) {
      let bumValue = parseInt(numString[length-6]) * 100000
      let remainder = numInt % 100000
      let rest = buildRemainder(remainder, true)

      return [
        bum[bumValue] + rest,
        bumPhrag[bumValue] + rest
      ]
    }

    // Ten-thousands - standard, phrag, and reversed
    if (length >= 5) {
      let value = parseInt(numString[length-5]) * 10000
      let remainder = numInt % 10000
      let rest = buildRemainder(remainder, true)

      return [
        tenthousands[value] + rest,
        tenthousandsPhrag[value] + rest,
        tenthousandsReversed[value] + rest
      ]
    }

    // Thousands - standard, phrag, and reversed
    if (length >= 4) {
      let value = parseInt(numString[length-4]) * 1000
      let remainder = numInt % 1000
      let rest = buildRemainder(remainder, true)

      return [
        thousands[value] + rest,
        thousandsPhrag[value] + rest,
        thousandsReversed[value] + rest
      ]
    }

    // Hundreds - standard and phrag
    if (length >= 3) {
      let value = parseInt(numString[length-3]) * 100
      let remainder = numInt % 100
      let rest = ''
      if (remainder > 0) {
        rest = 'དང་' // Always དང་ when hundreds is highest order
        if (remainder >= 20) {
          rest += this.getTwentyTo99(remainder)
        } else {
          rest += this.getOneToNineteen(remainder)
        }
      }

      return [
        hundreds[value] + rest,
        hundredsPhrag[value] + rest
      ]
    }

    // Below 100 - only one version
    if (numInt >= 20) {
      return [this.getTwentyTo99(numInt)]
    } else {
      return [this.getOneToNineteen(numInt)]
    }
  }

}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)+1; // lets make it inclusive of max
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const getArrayOfRandomInts = (min, max, num) => {
  let acc = []
  for (let i=0;i<num;i++) {
    let r = getRandomInt(min, max)
    acc.push(r)
  }
  return acc
}

const tibNums = new Map(Object.entries({
  '1':'༡',
  '2':'༢',
  '3':'༣',
  '4':'༤',
  '5':'༥',
  '6':'༦',
  '7':'༧',
  '8':'༨',
  '9':'༩',
  '0':'༠',
}))

function getTibetanNumberForChar(char) {
  if (tibNums.has(char.toString())) {
    //console.log(`${char} > ${tibNums.get(char)}`)
    return tibNums.get(char)
  }
  else {
    return char
  }
}

function toTibetanNumber(number) {
  let acc = ''
  let numAsString = `${number}`
  for (let i = 0; i < numAsString.length; i++) {
    let char = numAsString.charAt(i)
    acc  += '' + getTibetanNumberForChar(char)
  }
  return acc
}

export {
  getRandomInt,
  getArrayOfRandomInts,
  toTibetanNumber,
  getOneTo99,
  Number2Text
}
