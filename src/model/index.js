import rules from '../rules/index'
import { get } from '../code/lodash'
const href = window.location.href

const loadAction = function(handle) {
  window.addEventListener('load', handle)
}

for (let rule of Object.values(rules)) {
  const matchs = get(rule, 'matchs', ['http://*', 'https://*'])
  const r_list = matchs.map(match => new RegExp(match))
  if (r_list.some(r => r.test(href))) {
    const load = rule.load || false
    const { js, css } = rule
    load ? loadAction(js) : js()
    css && css()
  }
}
