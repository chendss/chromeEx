import $ from 'jquery'

const haoFilter = function() {
  console.log('百家号过滤')
  const list = []
  document.querySelectorAll('.result.c-container').forEach(parent => {
    const html = $(parent).html()
    if (html.includes('百家号')) {
      list.push(parent)
    }
  })
  list.forEach(l => l.remove())
}

export default function() {
  haoFilter()
}
