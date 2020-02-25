module.exports = function (source) {
  const line = source.split('\r\n')
  const codeList = line.map(code => {
    let result = code
    let code_ = code.replace(/\s*/g, "")
    if (code_.includes(';') && ['important', 'TODO:', '$:'].every(k => !code_.includes(k))) {
      result = code.replace(';', ' !important ;')
    }
    return result
  })
  return codeList.join('\r\n')
}
