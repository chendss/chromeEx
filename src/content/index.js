import rules from '../rules/index'
import { get } from 'lodash'
const href = window.location.href

const loadAction = function(handle) {
  window.addEventListener('load', handle)
}

console.log('js的生成规则', rules)

for (let rule of Object.values(rules)) {
  const matchs = get(rule, 'matchs', ['http://*', 'https://*'])
  const r_list = matchs.map(match => new RegExp(match))
  if (r_list.some(r => r.test(href))) {
    const load = rule.load || false
    const { js } = rule
    const action = js || function() {}
    load ? loadAction(action) : action()
  }
}
