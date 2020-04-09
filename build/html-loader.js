
const cheerio = require('cheerio')

module.exports = function (source) {
  const $ = cheerio.load(source, { decodeEntities: false })
  let result = {}
  $('body>*').each((index, ele) => {
    let dom = $(ele)
    let key = dom.attr('ident')
    let html = dom.toString()
    result[key] = html
  })
  return `const result = ${JSON.stringify(result)}; export default result`
}