
module.exports = function (source) {
  const items = source.split('<!>')
  let result = {}
  for (let item of items) {
    const lines = item.split('\r\n').filter(line => line !== '')
    const key = lines.shift()
    const selector = lines[0]
    if (selector.includes('<')) {
      const value = lines.join('\r\n')
      result[key] = value
    } else {
      lines.shift()
      const code = lines.join('\r\n')
      const fun = function (obj) {
        const parent = document.querySelector(selector)
        parent.insertAdjacentHTML('beforeend', lines.join('\n'))
      }
      result[key] = fun
    }
  }
  return `const result = eval(${result}); export default result`
}
