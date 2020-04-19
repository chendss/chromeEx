const path = require('path')

/**
 * 返回true则替换import 
 *
 * @param {string} [code='']
 * @returns
 */
const check = function (code = '') {
  if (code.includes(';')) {
    if (['important', 'TODO:', '$:', '@import', '@extend', '@include'].some(k => code.includes(k))) {
      return false
    } else if (code.includes('display')) {
      return code.includes('none')
    }
  }
  return true
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
