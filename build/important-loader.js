module.exports = function(source) {
  const line = source.split('\r\n')
  const codeList = line.map(code => {
    if (code.includes(';') && ['important', 'TODO:'].every(k => !code.includes(k))) {
      code = code.replace(';', ' !important ;')
    }
    return code
  })
  console.log('这个列表', codeList)
  return codeList.join('\r\n')
}
