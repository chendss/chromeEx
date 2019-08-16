import icoHandle from '../utils/index'

const iocJs = function() {
  const content = chrome.extension.getURL('js/content.js')
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', content)
  document.documentElement.appendChild(script)
}

const zoom = function() {
  let dx = window.innerWidth / 1920
  dx = Math.max(dx * 0.9, 1)
  const style = document.documentElement.style
  style.zoom = dx
}

const iocStyle = function() {
  icoHandle((rule, r) => {
    console.log('规则是使命', rule, r)
    const { css } = rule
    css && css()
  })
}

const main = function() {
  iocJs()
  zoom()
  iocStyle()
}

main()
