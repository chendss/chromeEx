import { get } from 'lodash'
import { toArray } from './tools'
import rules from '../rules/index'

const href = window.location.href

export const log = console.log

export default function (handle) {
  const matching = {}
  for (let ruleKey of Object.keys(rules)) {
    const rule = rules[ruleKey]
    const matchs = get(rule, 'matchs', ['http://', 'https://'])
    const r_list = toArray(matchs)
    const list = [...matchs, ...r_list]
    if (list.some(l => href.includes(l))) {
      matching[ruleKey] = rules[ruleKey]
      handle(rule)
    }
  }
  log('规则制定', matching)
}
