import rules from '../rules/index'
import { get } from 'lodash'

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
  const href = window.location.href
  for (let rule of Object.values(rules)) {
    const matchs = get(rule, 'matchs', ['http://*', 'https://*'])
    const r_list = matchs.map(match => new RegExp(match))
    if (r_list.some(r => r.test(href))) {
      const { css } = rule
      css && css()
    }
  }
}

const main = function() {
  iocJs()
  zoom()
  iocStyle()
}

main()
