import clearBaidu from './baidu'
import clearLink from './link'


/**
 * 清空cookies
 *
 */
const addClearBtn = function () {
  const body = document.querySelector('body')
  const btn = `<button class="_btn_p" id="_clear">清空cookies</button>`
  body.insertAdjacentHTML('beforeend', btn)
  const btnDom = document.querySelector('#_clear')
  btnDom.addEventListener('click', event => {
    event.preventDefault()
    localStorage.clear()
    sessionStorage.clear()
  })
}

const addMeta = function () {
  window.addEventListener('load', () => {
    const head = document.querySelector('head')
    const metaUTF8 = document.createElement('meta')
    metaUTF8.setAttribute('charset', 'utf-8')
    head.appendChild(metaUTF8)
    addClearBtn()
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
}
