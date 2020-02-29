import iocHandle from '../utils/index'
import excludes from '../rules/excludes'

console.log('插件加载')

const addId = function () {
  const documentElement = document.documentElement
  const widgetId = '__dashao'
  let id = documentElement.getAttribute('id') || ''
  if (id.includes(widgetId)) {
    return
  } else {
    id = widgetId
  }
  documentElement.setAttribute('id', id)
}

const iocJs = function () {
  const content = chrome.extension.getURL('js/content.js')
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', content)
  script.charset = 'UTF-8'
  document.documentElement.appendChild(script)
  addId()
}

const zoom = function () {
  if (excludes()) return
  let dx = window.innerWidth / 1920
  dx = Math.max(dx * 0.9, 1)
  const style = document.documentElement.style
  style.zoom = dx
}

const iocStyle = function () {
  require('../styles/global/index.scss')
  const matching = []
  iocHandle((rule, r) => {
    const { css } = rule
    matching.push(rule)
    css && css()
  })
  console.log('规则有', matching)
}

const main = function () {
  iocJs()
  zoom()
  iocStyle()
}

main()
