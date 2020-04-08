import clearLink from './link'
import Html from './index.html'
import clearBaidu from './baidu'
import autoFun from './auto'
import { insertBody } from '@/utils'
import addLoading from './loading'


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
  addMeta()
  clearBaidu()
  clearLink()
  autoFun()
  addLoading()
}
