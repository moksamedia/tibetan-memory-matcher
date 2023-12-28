function isString(test) {
  return typeof text !== 'string' || text instanceof String
}

function processTibetan(text, style, _class) {
  return text.replace(/[\u0F00-\u0FFF]+/gm, (match) => {
    return `<span style="${style}" class="${_class}">${match}</span>`
  })
}

function styleTibetan(text) {
  if (text == null || !isString(text) || text.trim() === "") return text;
  return processTibetan(text, null, "tibetan")
}

export {
  isString,
  processTibetan,
  styleTibetan
}
