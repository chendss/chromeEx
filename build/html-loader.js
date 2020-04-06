
module.exports = function (source) {
  const items = source.split('<!>')
  let result = {}
  for (let item of items) {
    const lines = item.split('\r\n').filter(line => line !== '')
    const key = lines.shift()
    result[key] = lines.join('\r\n')
  }
  return `const result = ${JSON.stringify(result)}; export default result`
}