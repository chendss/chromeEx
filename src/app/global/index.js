import lodash from 'lodash'
import autoFun from './auto'
import clearLink from './link'
import Html from './index.html'
import clearBaidu from './baidu'
import copyHtml from './copyHtml'
import addLoading from './loading'
import { insertBody } from '@/utils'


const addMeta = function () {
  window.addEventListener('load', () => {
    const head = document.querySelector('head')
    const metaUTF8 = document.createElement('meta')
    metaUTF8.setAttribute('charset', 'utf-8')
    head.appendChild(metaUTF8)
  })
}

/**
 * 全局函数入口
 *
 * @export
 */
export default function () {
  const funList = [
    addMeta,
    clearBaidu,
    clearLink,
    autoFun,
    addLoading,
    copyHtml,
  ]
  for (let f of funList) {
    try {
      f()
    } catch (error) {
      console.error('扩展初始化失败', error)
    }
  }
  window.lodash_ = lodash
}
