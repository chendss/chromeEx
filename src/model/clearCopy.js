const main = function() {
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
export default main
