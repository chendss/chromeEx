const cheerio = require('cheerio')
const he = require('he')
const fs = require('fs')

const html = fs.readFileSync('./test.html')
const $ = cheerio.load(html, { decodeEntities: false })
$('body>*').each((index, ele) => {
  console.log('eeqq', index, $(ele).toString())
})

// console.log('eeee', $.html('body'))