import { get } from 'lodash'

export const toArray = function(source) {
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
export const clearCookie = function() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  let domainArray = ['.dtyunxi.cn', '.dtyunxi.com']
  if (keys) {
    for (var i = keys.length; i--; ) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() //清除当前域名下的,例如：m.kevis.com
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() //清除当前域名下的，例如 .m.kevis.com
      domainArray.forEach(domain => {
        document.cookie = keys[i] + `=0;path=/;domain=${domain};expires=` + new Date(0).toUTCString() //清除一级域名下的或指定的
      })
    }
  }
}
