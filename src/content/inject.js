import iocHandle from '../utils/index'
import excludes from '../rules/excludes'
import autoHooks from '../utils/autoHooks'
import $ from 'jquery'

window.jQuery = $
chrome.runtime.onMessage.addListener((...args) => {
  console.log('响应', ...args)
})
// import hookDebugger from '../utils/hookDebugger'

console.log('插件加载', chrome.cookies)

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

const iocGlobalStyle = function () {
  const styles = [
    'modal.css',
    'global.css',
    'animate.css',
    'bootstrap.css',
  ]
  for (let style of styles) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = chrome.extension.getURL(style)
    document.documentElement.appendChild(link)
  }
}

const iocScript = function (src) {
  const scripts = [
    'lulu.js',
    'js/content.js',
  ]
  for (let src of scripts) {
    const content = chrome.extension.getURL(src)
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', content)
    script.charset = 'UTF-8'
    document.documentElement.appendChild(script)
  }
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
  addId()
  iocScript()
  iocGlobalStyle()
  zoom()
  iocStyle()
  // autoHooks()
  // hookDebugger()
}

main()
