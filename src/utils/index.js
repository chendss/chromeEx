import { get } from 'lodash'
import rules from '../rules/index'
import { toArray } from './tools'

const href = window.location.href

export const log = console.log

export default function(handle) {
  for (let ruleKey of Object.keys(rules)) {
    const rule = rules[ruleKey]
    const matchs = get(rule, 'matchs', ['http://*', 'https://*'])
    const r_list = toArray(matchs).map(match => new RegExp(match))
    if (r_list.some(r => r.test(href)) || matchs.some(m => href.includes(m))) {
      handle(rule)
    }
  }
}
