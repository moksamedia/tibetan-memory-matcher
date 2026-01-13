const MAX_SUPPORTED_NUMBER = 999999999

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
  '100': 'ཆིག་བརྒྱ་',
  '200': 'ཉིས་བརྒྱ་',
  '300': 'སུམ་བརྒྱ་',
  '400': 'བཞི་བརྒྱ་',
  '500': 'ལྔ་བརྒྱ་',
  '600': 'དྲུག་བརྒྱ་',
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
  '30000': 'སུམ་ཁྲི་',
  '40000': 'བཞི་ཁྲི་',
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

const saya = {
  '1000000': 'ས་ཡ་གཅིག་',
  '2000000': 'ས་ཡ་གཉིས་',
  '3000000': 'ས་ཡ་གསུམ་',
  '4000000': 'ས་ཡ་བཞི་',
  '5000000': 'ས་ཡ་ལྔ་',
  '6000000': 'ས་ཡ་དྲུག་',
  '7000000': 'ས་ཡ་བདུན་',
  '8000000': 'ས་ཡ་བརྒྱད་',
  '9000000': 'ས་ཡ་དགུ་',
}

const sayaPhrag = {
  '1000000': 'ས་ཡ་ཕྲག་གཅིག་',
  '2000000': 'ས་ཡ་ཕྲག་གཉིས་',
  '3000000': 'ས་ཡ་ཕྲག་གསུམ་',
  '4000000': 'ས་ཡ་ཕྲག་བཞི་',
  '5000000': 'ས་ཡ་ཕྲག་ལྔ་',
  '6000000': 'ས་ཡ་ཕྲག་དྲུག་',
  '7000000': 'ས་ཡ་ཕྲག་བདུན་',
  '8000000': 'ས་ཡ་ཕྲག་བརྒྱད་',
  '9000000': 'ས་ཡ་ཕྲག་དགུ་',
}

const byeba = {
  '10000000': 'བྱེ་བ་གཅིག་',
  '20000000': 'བྱེ་བ་གཉིས་',
  '30000000': 'བྱེ་བ་གསུམ་',
  '40000000': 'བྱེ་བ་བཞི་',
  '50000000': 'བྱེ་བ་ལྔ་',
  '60000000': 'བྱེ་བ་དྲུག་',
  '70000000': 'བྱེ་བ་བདུན་',
  '80000000': 'བྱེ་བ་བརྒྱད་',
  '90000000': 'བྱེ་བ་དགུ་',
}

const byebaPhrag = {
  '10000000': 'བྱེ་བ་ཕྲག་གཅིག་',
  '20000000': 'བྱེ་བ་ཕྲག་གཉིས་',
  '30000000': 'བྱེ་བ་ཕྲག་གསུམ་',
  '40000000': 'བྱེ་བ་ཕྲག་བཞི་',
  '50000000': 'བྱེ་བ་ཕྲག་ལྔ་',
   '60000000': 'བྱེ་བ་ཕྲག་དྲུག་',
   '70000000': 'བྱེ་བ་ཕྲག་བདུན་',
   '80000000': 'བྱེ་བ་ཕྲག་བརྒྱད་',
   '90000000': 'བྱེ་བ་ཕྲག་དགུ་',
}

const dungphyur = {
  '100000000': 'དུང་ཕྱུར་གཅིག་',
  '200000000': 'དུང་ཕྱུར་གཉིས་',
  '300000000': 'དུང་ཕྱུར་གསུམ་',
  '400000000': 'དུང་ཕྱུར་བཞི་',
  '500000000': 'དུང་ཕྱུར་ལྔ་',
  '600000000': 'དུང་ཕྱུར་དྲུག་',
  '700000000': 'དུང་ཕྱུར་བདུན་',
  '800000000': 'དུང་ཕྱུར་བརྒྱད་',
  '900000000': 'དུང་ཕྱུར་དགུ་',
}

const dungphyurPhrag = {
  '100000000': 'དུང་ཕྱུར་ཕྲག་གཅིག་',
  '200000000': 'དུང་ཕྱུར་ཕྲག་གཉིས་',
  '300000000': 'དུང་ཕྱུར་ཕྲག་གསུམ་',
  '400000000': 'དུང་ཕྱུར་ཕྲག་བཞི་',
  '500000000': 'དུང་ཕྱུར་ཕྲག་ལྔ་',
  '600000000': 'དུང་ཕྱུར་ཕྲག་དྲུག་',
  '700000000': 'དུང་ཕྱུར་ཕྲག་བདུན་',
  '800000000': 'དུང་ཕྱུར་ཕྲག་བརྒྱད་',
  '900000000': 'དུང་ཕྱུར་ཕྲག་དགུ་',
}

function getOneTo99(num) {
  let numInt = Number.isInteger(num) ? num : parseInt(num)

  if (numInt < 0) {
    throw Error("Negative numbers are not supported")
  }
  if (numInt > 99) {
    throw Error("getOneTo99 only supports numbers from 0 to 99")
  }
  if (numInt === 0) {
    throw Error("getOneTo99 does not support 0, use tibetanNumberToText instead")
  }

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
      return num === 30 ? 'སུམ་ཅུ་' : 'སུམ་ཅུ་སོ་' + lastDigit
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

  if (numInt >= 20 && numInt < 100) {
    return getTwentyTo99(numInt)
  }
  else if (numInt < 20 && numInt > 0) {
    return getOneToNineteen(numInt)
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

  getSaya(num) {
    if (saya[num]) {
      return saya[num]
    }
    else {
      throw Error("Millions value not found")
    }
  }

  getByeba(num) {
    if (byeba[num]) {
      return byeba[num]
    }
    else {
      throw Error("Ten-millions value not found")
    }
  }

  getDungphyur(num) {
    if (dungphyur[num]) {
      return dungphyur[num]
    }
    else {
      throw Error("Hundred-millions value not found")
    }
  }

  tibetanNumberToText(num) {
    console.log("tibetanNumberToText num:" + num)
    let numInt = Number.isInteger(num) ? num : parseInt(num) // ensure Integer

    if (numInt < 0) {
      throw Error("Negative numbers are not supported")
    }
    if (numInt > MAX_SUPPORTED_NUMBER) {
      throw Error(`Number exceeds maximum supported value of ${MAX_SUPPORTED_NUMBER.toLocaleString('en-US')}`)
    }

    let numString = typeof num === 'string' ? num : num.toString()  // ensure String
    let length = numString.length
    let segments = []
    let acc = ''

    if (length >= 9) {
      let dungphyurVal = numString[length-9] * 100000000
      let text = this.getDungphyur(dungphyurVal)
      segments.push({ order: 'dungphyur', text })
      acc += text
      if (num % 100000000 === 0) return { string: acc, segments }
    }
    if (length >= 8) {
      let byebaVal = numString[length-8] * 10000000
      if (byebaVal === 0) {
        if (this.useNots) {
          let text = 'བྱེ་བ་མེད་'
          segments.push({ order: 'byeba', text })
          acc += text
        }
      }
      else {
        let text = this.getByeba(byebaVal)
        segments.push({ order: 'byeba', text })
        acc += text
      }
      if (num % 10000000 === 0) return { string: acc, segments }
    }
    if (length >= 7) {
      let sayaVal = numString[length-7] * 1000000
      if (sayaVal === 0) {
        if (this.useNots) {
          let text = 'ས་ཡ་མེད་'
          segments.push({ order: 'saya', text })
          acc += text
        }
      }
      else {
        let text = this.getSaya(sayaVal)
        segments.push({ order: 'saya', text })
        acc += text
      }
      if (num % 1000000 === 0) return { string: acc, segments }
    }
    if (length >= 6) {
      let bum = numString[length-6] * 100000
      if (bum === 0) {
        if (this.useNots) {
          let text = 'འབུམ་མེད་'
          segments.push({ order: 'bum', text })
          acc += text
        }
      }
      else {
        let text = this.getBum(bum)
        segments.push({ order: 'bum', text })
        acc += text
      }
      if (num % 100000 === 0) return { string: acc, segments }
    }
    if (length >= 5) {
      let tenthousands = numString[length-5] * 10000
      if (tenthousands === 0) {
        if (this.useNots) {
          let text = 'ཁྲི་མེད་'
          segments.push({ order: 'tenthousands', text })
          acc += text
        }
      }
      else {
        let text = this.getTenThousands(tenthousands)
        segments.push({ order: 'tenthousands', text })
        acc += text
      }
      if (num % 10000 === 0) return { string: acc, segments }
    }
    if (length >= 4) {
      let thousands = numString[length-4] * 1000
      console.log('thousands:' + thousands)
      if (thousands === 0) {
        if (this.useNots) {
          let text = 'སྟོང་མེད་'
          segments.push({ order: 'thousands', text })
          acc += text
        }
      }
      else {
        let text = this.getThousands(thousands)
        segments.push({ order: 'thousands', text })
        acc += text
      }
      if (num % 1000 === 0) return { string: acc, segments }
    }
    if (length >= 3) {
      let hundreds = numString[length-3] * 100
      if (hundreds === 0) {
        if (this.useNots) {
          let text = 'བརྒྱ་མེད་'
          segments.push({ order: 'hundreds', text })
          acc += text
        }
      }
      else {
        let text = this.getHundreds(hundreds)
        if (num % 100 !== 0 && numInt < 1000) text += 'དང་'
        segments.push({ order: 'hundreds', text })
        acc += text
        if (num % 100 === 0) return { string: acc, segments }
      }
    }
    if (length >= 2) {
      let tens = numInt % 100
      if (tens > 0) {
        let text = ''
        if (tens >= 20) {
          text = this.getTwentyTo99(tens)
        }
        else {
          if (numString[length - 2] === '0' && this.useNots) text += 'བཅུ་མེད་'
          text += this.getOneToNineteen(tens)
        }
        segments.push({ order: 'tens-ones', text })
        acc += text
      }
    }
    if (length == 1) {
      if (num === 0) {
        let text = 'ཀླད་སྐོར་'
        return { string: text, segments: [{ order: 'zero', text }] }
      }
      let text = this.getOneToNineteen(num)
      segments.push({ order: 'ones', text })
      acc += text
    }
    return { string: acc, segments }
  }

  getAllVersions(num) {
    let numInt = Number.isInteger(num) ? num : parseInt(num)

    if (numInt < 0) {
      throw Error("Negative numbers are not supported")
    }
    if (numInt > MAX_SUPPORTED_NUMBER) {
      throw Error(`Number exceeds maximum supported value of ${MAX_SUPPORTED_NUMBER.toLocaleString('en-US')}`)
    }
    if (numInt === 0) {
      let text = 'ཀླད་སྐོར་'
      return {
        strings: [text],
        segments: [[{ order: 'zero', text }]]
      }
    }

    let numString = typeof num === 'string' ? num : num.toString()
    let length = numString.length

    // Helper to build the remainder with standard forms only
    const buildRemainder = (remainder, hasHigherThanHundreds) => {
      if (remainder === 0) return { string: '', segments: [] }

      let remString = remainder.toString()
      let remLength = remString.length
      let acc = ''
      let segments = []

      // Bum (standard only)
      if (remLength >= 6) {
        let bumVal = parseInt(remString[remLength-6]) * 100000
        if (bumVal > 0) {
          let text = this.getBum(bumVal)
          segments.push({ order: 'bum', text })
          acc += text
        }
        if (remainder % 100000 === 0) return { string: acc, segments }
      }

      // Ten-thousands (standard only)
      if (remLength >= 5) {
        let tenthousandsVal = parseInt(remString[remLength-5]) * 10000
        if (tenthousandsVal > 0) {
          let text = this.getTenThousands(tenthousandsVal)
          segments.push({ order: 'tenthousands', text })
          acc += text
        }
        if (remainder % 10000 === 0) return { string: acc, segments }
      }

      // Thousands (standard only)
      if (remLength >= 4) {
        let thousandsVal = parseInt(remString[remLength-4]) * 1000
        if (thousandsVal > 0) {
          let text = this.getThousands(thousandsVal)
          segments.push({ order: 'thousands', text })
          acc += text
        }
        if (remainder % 1000 === 0) return { string: acc, segments }
      }

      // Hundreds (standard only)
      if (remLength >= 3) {
        let hundredsVal = parseInt(remString[remLength-3]) * 100
        if (hundredsVal > 0) {
          let text = this.getHundreds(hundredsVal)
          if (remainder % 100 !== 0 && !hasHigherThanHundreds) {
            text += 'དང་'
          }
          segments.push({ order: 'hundreds', text })
          acc += text
          if (remainder % 100 === 0) return { string: acc, segments }
        }
      }

      // Tens and ones
      let tensOnes = remainder % 100
      if (tensOnes > 0) {
        let text = ''
        if (tensOnes >= 20) {
          text = this.getTwentyTo99(tensOnes)
        } else {
          text = this.getOneToNineteen(tensOnes)
        }
        segments.push({ order: 'tens-ones', text })
        acc += text
      }

      return { string: acc, segments }
    }

    // Hundred-millions (dungphyur) - standard and phrag
    if (length >= 9) {
      let value = parseInt(numString[length-9]) * 100000000
      let remainder = numInt % 100000000
      let { string: restStr, segments: restSegs } = buildRemainder(remainder, true)

      let standardText = dungphyur[value]
      let phragText = dungphyurPhrag[value]
      let dangText = remainder > 0 ? 'དང་' : ''

      return {
        strings: [
          standardText + restStr,
          phragText + dangText + restStr
        ],
        segments: [
          [{ order: 'dungphyur', text: standardText }, ...restSegs],
          [{ order: 'dungphyur', text: phragText + dangText }, ...restSegs]
        ]
      }
    }

    // Ten-millions (byeba) - standard and phrag
    if (length >= 8) {
      let value = parseInt(numString[length-8]) * 10000000
      let remainder = numInt % 10000000
      let { string: restStr, segments: restSegs } = buildRemainder(remainder, true)

      let standardText = byeba[value]
      let phragText = byebaPhrag[value]
      let dangText = remainder > 0 ? 'དང་' : ''

      return {
        strings: [
          standardText + restStr,
          phragText + dangText + restStr
        ],
        segments: [
          [{ order: 'byeba', text: standardText }, ...restSegs],
          [{ order: 'byeba', text: phragText + dangText }, ...restSegs]
        ]
      }
    }

    // Millions (saya) - standard and phrag
    if (length >= 7) {
      let value = parseInt(numString[length-7]) * 1000000
      let remainder = numInt % 1000000
      let { string: restStr, segments: restSegs } = buildRemainder(remainder, true)

      let standardText = saya[value]
      let phragText = sayaPhrag[value]
      let dangText = remainder > 0 ? 'དང་' : ''

      return {
        strings: [
          standardText + restStr,
          phragText + dangText + restStr
        ],
        segments: [
          [{ order: 'saya', text: standardText }, ...restSegs],
          [{ order: 'saya', text: phragText + dangText }, ...restSegs]
        ]
      }
    }

    // Hundred-thousands (bum) - standard and phrag
    if (length >= 6) {
      let bumValue = parseInt(numString[length-6]) * 100000
      let remainder = numInt % 100000
      let { string: restStr, segments: restSegs } = buildRemainder(remainder, true)

      let standardText = bum[bumValue]
      let phragText = bumPhrag[bumValue]
      let dangText = remainder > 0 ? 'དང་' : ''

      return {
        strings: [
          standardText + restStr,
          phragText + dangText + restStr
        ],
        segments: [
          [{ order: 'bum', text: standardText }, ...restSegs],
          [{ order: 'bum', text: phragText + dangText }, ...restSegs]
        ]
      }
    }

    // Ten-thousands - standard, phrag, and reversed
    if (length >= 5) {
      let value = parseInt(numString[length-5]) * 10000
      let remainder = numInt % 10000
      let { string: restStr, segments: restSegs } = buildRemainder(remainder, true)

      let standardText = tenthousands[value]
      let phragText = tenthousandsPhrag[value]
      let reversedText = tenthousandsReversed[value]
      let dangText = remainder > 0 ? 'དང་' : ''

      return {
        strings: [
          standardText + restStr,
          phragText + dangText + restStr,
          reversedText + restStr
        ],
        segments: [
          [{ order: 'tenthousands', text: standardText }, ...restSegs],
          [{ order: 'tenthousands', text: phragText + dangText }, ...restSegs],
          [{ order: 'tenthousands', text: reversedText }, ...restSegs]
        ]
      }
    }

    // Thousands - standard, phrag, and reversed
    if (length >= 4) {
      let value = parseInt(numString[length-4]) * 1000
      let remainder = numInt % 1000
      let { string: restStr, segments: restSegs } = buildRemainder(remainder, true)

      let standardText = thousands[value]
      let phragText = thousandsPhrag[value]
      let reversedText = thousandsReversed[value]
      let dangText = remainder > 0 ? 'དང་' : ''

      return {
        strings: [
          standardText + restStr,
          phragText + dangText + restStr,
          reversedText + restStr
        ],
        segments: [
          [{ order: 'thousands', text: standardText }, ...restSegs],
          [{ order: 'thousands', text: phragText + dangText }, ...restSegs],
          [{ order: 'thousands', text: reversedText }, ...restSegs]
        ]
      }
    }

    // Hundreds - standard and phrag
    if (length >= 3) {
      let value = parseInt(numString[length-3]) * 100
      let remainder = numInt % 100
      let restText = ''
      let restSegs = []

      if (remainder > 0) {
        let tensOnesText = ''
        if (remainder >= 20) {
          tensOnesText = this.getTwentyTo99(remainder)
        } else {
          tensOnesText = this.getOneToNineteen(remainder)
        }
        restText = 'དང་' + tensOnesText
        restSegs = [{ order: 'tens-ones', text: tensOnesText }]
      }

      let standardText = hundreds[value] + restText
      let phragText = hundredsPhrag[value] + restText

      return {
        strings: [standardText, phragText],
        segments: [
          [{ order: 'hundreds', text: hundreds[value] + (remainder > 0 ? 'དང་' : '') }, ...restSegs],
          [{ order: 'hundreds', text: hundredsPhrag[value] + (remainder > 0 ? 'དང་' : '') }, ...restSegs]
        ]
      }
    }

    // Below 100 - only one version
    if (numInt >= 20) {
      let text = this.getTwentyTo99(numInt)
      return {
        strings: [text],
        segments: [[{ order: 'tens-ones', text }]]
      }
    } else {
      let text = this.getOneToNineteen(numInt)
      return {
        strings: [text],
        segments: [[{ order: 'ones', text }]]
      }
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

// Reverse mapping: Tibetan numerals to western digits
const tibNumsReverse = new Map([
  ['༡', '1'],
  ['༢', '2'],
  ['༣', '3'],
  ['༤', '4'],
  ['༥', '5'],
  ['༦', '6'],
  ['༧', '7'],
  ['༨', '8'],
  ['༩', '9'],
  ['༠', '0']
])

function fromTibetanNumber(tibetanNumber) {
  let acc = ''
  for (let i = 0; i < tibetanNumber.length; i++) {
    let char = tibetanNumber.charAt(i)
    if (tibNumsReverse.has(char)) {
      acc += tibNumsReverse.get(char)
    } else {
      // If we encounter a non-Tibetan numeral, return null
      return null
    }
  }
  return acc
}

// Check if a string contains only Tibetan numerals
function isTibetanNumeral(str) {
  if (!str || str.length === 0) return false
  for (let i = 0; i < str.length; i++) {
    if (!tibNumsReverse.has(str.charAt(i))) {
      return false
    }
  }
  return true
}

// Check if a string contains only western digits
function isWesternNumeral(str) {
  return /^\d+$/.test(str)
}

export {
  MAX_SUPPORTED_NUMBER,
  getRandomInt,
  getArrayOfRandomInts,
  toTibetanNumber,
  fromTibetanNumber,
  isTibetanNumeral,
  isWesternNumeral,
  getOneTo99,
  Number2Text
}
