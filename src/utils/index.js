import rules from '../rules/index'
import { get } from 'lodash'
const href = window.location.href

export default function(handle) {
  for (let ruleKey of Object.keys(rules)) {
    const rule = rules[ruleKey]
    const matchs = get(rule, 'matchs', ['http://*', 'https://*'])
    const r_list = matchs.map(match => new RegExp(match))
    if (r_list.some(r => r.test(href))) {
      handle(rule)
    }
  }
}
