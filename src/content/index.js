import rules from '../rules/index'
import { get } from 'lodash'
const href = window.location.href

const loadAction = function(handle) {
  window.addEventListener('load', handle)
}

const actionJs = function() {
  for (let ruleKey of Object.keys(rules)) {
    const rule = rules[ruleKey]
    const matchs = get(rule, 'matchs', ['http://*', 'https://*'])
    const r_list = matchs.map(match => new RegExp(match))
    if (r_list.some(r => r.test(href))) {
      const load = rule.load || false
      const { js } = rule
      const action = js || function() {}
      load ? loadAction(action) : action()
    }
  }
}

const main = function() {
  if (href.includes('localhost:')) {
    return
  }
  actionJs()
}

main()
console.log('插件加载')
