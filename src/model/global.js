const clearCopy = function() {
  'use strict'
  document.addEventListener('copy', e => {
    e.preventDefault()
    var pagelink = '\nRead more: ' + document.location.href,
      copytext = window.getSelection()
    var clipdata = e.clipboardData || window.clipboardData
    if (clipdata) {
      clipdata.setData('Text', copytext)
    }
  })
}

const clearBaidu = function() {
  let n = 0
  const baidu = setInterval(() => {
    const scripts = document.querySelectorAll('script')
    scripts.forEach(script => {
      const html = script.innerHTML
      if (html.includes('百度统计')) {
        script.remove()
      }
    })
    n++
    if (n > 100) {
      clearInterval(baidu)
    }
  }, 100)
}

export default function() {
  clearBaidu()
  clearCopy()
}
