import clearBaidu from './baidu'
import clearLink from './link'
import ajaxHooks from './ajaxHooks'

const addMeta = function () {
  window.addEventListener('load', () => {
    const head = document.querySelector('head')
    const metaUTF8 = document.createElement('meta')
    metaUTF8.setAttribute('charset', 'utf-8')
    head.appendChild(metaUTF8)
  })
}

const addId = function () {
  const documentElement = document.documentElement
  const widgetId = '__dashao'
  let id = documentElement.getAttribute('id') || ''
  if (id.includes(widgetId)) {
    return
  } else {
    id = widgetId
  }
  documentElement.setAttribute('id', id)
}

/**
 * 全局函数入口
 *
 * @export
 */
export default function () {
  addId()
  addMeta()
  clearBaidu()
  clearLink()
  ajaxHooks()
}
