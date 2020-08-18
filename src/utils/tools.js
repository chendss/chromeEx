import { get, sum } from 'lodash'

export const log = function (...args) {
  console.log(...args)
}

/**
* document.querySelector简化
*
* @param {String} s
* @returns {HTMLAreaElement}
*/
export const q = function (s) {
  return document.querySelector(s)
}

/**
* document.querySelectorAll简化
*
* @param {String} s
* @returns {Array<Element>}
*/
export const qs = function (s) {
  return [...document.querySelectorAll(s)]
}

/**
* document.querySelector
*
* @param {HTMLFrameSetElement} dom
* @param {String} selector
* @returns {HTMLFrameSetElement}
*/
export const e = function (dom, selector) { return dom.querySelector(selector) }

/**
* 相当于dom.querySelectorAll
*
* @param {HTMLElementTagNameMap} dom
* @returns {Array<HTMLElementTagNameMap>}
* @param {String} selector
*/
export const es = (dom, selector) => [...dom.querySelectorAll(selector)]

export const toArray = function (source) {
  let result = []
  if (source instanceof Array) {
    result = source
  } else {
    result = [source]
  }
  return result.filter(f => !['', null, undefined].includes(f))
}

/**
 * 清空cookies
 *
 */
export const clearCookie = function () {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  let domainArray = ['.dtyunxi.cn', '.dtyunxi.com']
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString()
      domainArray.forEach(domain => {
        document.cookie = keys[i] + `=0;path=/;domain=${domain};expires=` + new Date(0).toUTCString()
      })
    }
  }
}

export const average = function (list) {
  if (list instanceof Array) {
    const total = sum(list.map(i => typeof i === 'number' ? i : Number(i)))
    const len = list.length
    return Math.floor(total / len)
  } else {
    return 0
  }
}