import { get } from 'lodash'
import { toArray } from './tools'
import rules from '../rules/index'

const href = window.location.href

export const log = console.log

/**
 * 生成随机数
 *
 * @param {number} [n=32]
 * @returns
 */
export const random = function (n = 32) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let letter = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
  let maxPos = chars.length
  let result = ''
  for (let i = 0; i < n; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  result = letter.charAt(Math.floor(Math.random() * letter.length)) + result
  return result.substring(0, result.length - 1)
}

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
