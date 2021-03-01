import Html from './index.html'
import { insertBody } from '../../utils/index'

const loadJs = function () {
  const div = Html['full_btn_box']
  insertBody(div)
  const btn = document.querySelector('#id-full-btn-box .full_btn')
  btn.addEventListener('click', () => {
    const video = document.querySelector('.iqp-player .iqp-player video')
    video.requestFullscreen()
  })
}

export default function () {
  window.addEventListener('load', loadJs)
  Object.defineProperty(document, 'visibilityState', {
    configurable: false,
    writable: false,
    value: 'visible',
  })
  Object.defineProperty(document, 'hidden', {
    configurable: false,
    writable: false,
    value: false,
  })
  Object.defineProperty(document, 'webkitHidden', {
    configurable: false,
    writable: false,
    value: false,
  })
  for (let eventName of ["visibilitychange", "webkitvisibilitychange"]) {
    window.addEventListener(eventName, function handle (e) {
      e.stopImmediatePropagation()
      e.preventDefault()
    }, true)
  }
}