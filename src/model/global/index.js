import clearBaidu from './baidu'
import clearLink from './link'
import Html from './index.html'
import { insertBody } from '../../utils'


const addMeta = function () {
  window.addEventListener('load', () => {
    const head = document.querySelector('head')
    const metaUTF8 = document.createElement('meta')
    metaUTF8.setAttribute('charset', 'utf-8')
    head.appendChild(metaUTF8)
  })
}

const addClearBtn = function () {
  window.addEventListener('load', () => {
    insertBody(Html['clearBtn'])
    const doc = document.querySelector('#clearBtn')
    doc.addEventListener('click', () => {
      chrome.runtime.sendMessage('clearStore')
    })

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
  // addClearBtn()
}
