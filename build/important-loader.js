const path = require('path')

const check = function (code = '') {
  if (code.includes(';')) {
    if (['important', 'TODO:', '$:', '@import', '@extend', '@include'].every(k => !code.includes(k))) {
      return true
    } else if (code.includes('display')) {
      return code.includes('none')
    }
  }
  return false
}

module.exports = function (source) {
  const line = source.split('\r\n')
  const codeList = line.map(code => {
    let result = code
    let code_ = code.replace(/\s*/g, "")
    if (check(code_)) {
      result = code.replace(';', ' !important ;')
    }
    if (code_.includes('~@')) {
      result = result.replace('~@', path.resolve('src/'))
    }
    return result
  })
  return codeList.join('\r\n')
}
