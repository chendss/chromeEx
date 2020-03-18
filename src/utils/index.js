import { toArray } from './tools'
import rules from '../rules/index'
import Nedb from 'nedb'
import { isArray, pick, map, mergeWith, get as lodashGet, isEqual, isObject, set, isFunction } from 'lodash'

const href = window.location.href

export const log = console.log

/**
* 创建数据库对象
*
* @param {*} dbPath
* @returns
*/
export const dataset = function (dbPath) {
  return new Nedb({
    filename: dbPath,
    autoload: true
  })
}

/**
* 找到一个值
*
* @param {*} dict_
* @returns
*/
export const datasetFind = function (db, dict_) {
  return new Promise((resolve) => {
    db.findOne(dict_, (err, docs) => {
      resolve(docs)
    })
  })
}

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

export const queryToObj = function () {
  const url = window.location.href
  let result = {}
  const urlSplit = url.split('?')
  const len = urlSplit.length - 1
  let queryParam = urlSplit[len] || ''
  queryParam
    .split('&')
    .filter(str => str !== '')
    .forEach(str => {
      const [key, value] = str.split('=')
      result[key] = value
    })
  return result
}

/**
 * lodash的 get函数超集，当取得值为null、 null、undefined,''将返回默认值
 * path支持数组，会依次选取优先级高的放前面
 * @static
 * @param {object} obj 源数据
 * @param {string|array} path 参数路径
 * @param {*} defaultValue 默认值
 * @returns
 *
 */
export const get = function (obj, path, defaultValue) {
  let value = null
  const rules = [null, 'null', '', undefined]
  const pathList = toArray(path)
  for (let p of pathList) {
    value = lodashGet(obj, p + '', null)
    if (!rules.includes(value)) {
      return value
    }
  }
  return defaultValue
}

export const dpi = function (dom) {
  let dx = window.innerWidth / 1920
  dx = Math.max(dx * 0.9, 1)
  const fontSize = Number(getComputedStyle(dom).fontSize.replace('px', ''))
  const size = Math.ceil(fontSize * dx)
  const style = dom.getAttribute('style') || ''
  dom.setAttribute('style', style + `font-size:${size}px;`)
}

/**
* 动态加载js
*
* @param {Object} srcDict src的字典
*/
export const createScriptFormRemote = function (srcDict) {
  for (let key of Object.keys(srcDict)) {
    if (document.querySelector(`#${key}`) == null) {
      const src = srcDict[key]
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = src
      script.id = key
      document.head.appendChild(script)
    }
  }
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
