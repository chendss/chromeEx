import { get } from 'lodash'

export const log = function (...args) {
  console.log(...args)
}

export const q = s => document.querySelector(s)

export const qs = s => document.querySelectorAll(s)

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
