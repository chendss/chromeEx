
const cheerio = require('cheerio')

const random = (n = 32) => {
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
  const letter = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz"
  const maxPos = chars.length
  let result = ""
  for (let i = 0; i < n; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  result = letter.charAt(Math.floor(Math.random() * letter.length)) + result
  return result.substring(0, result.length - 1)
}

module.exports = function (source) {
  const $ = cheerio.load(source, { decodeEntities: false })
  let result = {}
  $('body>*').each((index, ele) => {
    let dom = $(ele)
    let key = dom.attr('ident')
    let html = dom.toString()
    result[key] = html
  })
  const key = `result${random(8)}`
  return `;const  ${key} = ${JSON.stringify(result)}; export default ${key};`
}