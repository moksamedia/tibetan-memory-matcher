
const specialNumbers = {
  '1': 'གཅིག་',
  '2': 'གཉིས',
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

const Number2Text = class {

  constructor(reverseThousands,reverseTenthousands) {
    this.reverseTenthousands = reverseTenthousands
    this.reverseThousands = reverseThousands
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
    console.log(num)
    if (specialNumbers[num]) {
      return specialNumbers[num]
    }
    else if (num >= 20 && num < 30) {
      return 'ཉི་ཤུ་རྩ་' + this.tibetanNumberToText(num % 10)
    }
    else if (num >= 30 && num < 40) {
      return 'སུམ་ཅུ་སོ་' + this.tibetanNumberToText(num % 10)
    }
    else if (num >= 40 && num < 50) {
      return 'བཞི་བཅུ་ཞེ་' + this.tibetanNumberToText(num % 10)
    }
    else if (num >= 50 && num < 60) {
      return 'ལྔ་བཅུ་ང་' + this.tibetanNumberToText(num % 10)
    }
    else if (num >= 60 && num < 70) {
      return 'དྲུག་ཅུ་རེ་' + this.tibetanNumberToText(num % 10)
    }
    else if (num >= 70 && num < 80) {
      return 'བདུན་ཅུ་དོན་' + this.tibetanNumberToText(num % 10)
    }
    else if (num >= 80 && num < 90) {
      return 'བརྒྱད་བཅུ་གྱ་' + this.tibetanNumberToText(num % 10)
    }
    else if (num >= 90 && num < 100) {
      return 'དགུ་བཅུ་གོ་' + this.tibetanNumberToText(num % 10)
    }
    else if (num === 100) {
      return 'བརྒྱ་'
    }
    else if (num > 100 && num < 1000) {
      let tens = num % 100 // whole number below 100, such as 34, 98, 21, ...
      let hundreds = num % 1000 - num % 100 // just the hundreds, 100, 200, 300, ...
      if (tens) {
        // use parentNum to detect case when we have thousands, so omit dang
        return this.tibetanNumberToText(hundreds) + "དང་" + this.tibetanNumberToText(tens)
      }
      else {
        return this.tibetanNumberToText(hundreds)
      }
    }
    else if (num > 1000 && num < 10000) {
      let thousands = num % 10000 - num % 1000
      let tens = num % 100 // whole number below 100, such as 34, 98, 21, ...
      let hundreds = num % 1000 - num % 100 // just the hundreds, 100, 200, 300, ...
      if (hundreds) {
        if (tens) {
          return this.getThousands(thousands) + this.tibetanNumberToText(hundreds) +  this.tibetanNumberToText(tens)
        }
        else {
          return this.getThousands(thousands) + this.tibetanNumberToText(hundreds)
        }
      }
      else return this.getThousands(thousands)
    }
    else if (num > 10000 && num < 100000) {
      let tenthousands = num % 100000 - num % 10000
      let thousands = num % 10000
      if (thousands) {
        return this.getTenThousands(tenthousands) + this.tibetanNumberToText(thousands) // this needs to recur, not truncated thousands
      }
      else {
        return this.getTenThousands(tenthousands)
      }
    }
    else if (num > 100000 && num < 1000000) {
      let onehundredthousands = num % 1000000 - num % 100000
      let tenthousands = num % 100000
      if (tenthousands) {
        return this.getBum(tenthousands) + this.tibetanNumberToText(tenthousands) // this needs to recur, not truncated thousands
      }
      else {
        return this.getBum(tenthousands)
      }
    }
  }

}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
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

console.log(tibNums)

function getTibetanNumberForChar(char) {
  if (tibNums.has(char.toString())) {
    console.log(`${char} > ${tibNums.get(char)}`)
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
  Number2Text
}
