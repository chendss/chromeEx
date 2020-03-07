import { get, isInViewPort } from '../../utils/index'

const action = function () {
  const imgs = [...document.querySelectorAll('img')]
  for (let img of imgs) {
    const originSrc = get({ ...img.dataset }, 'original', null)
    if (isInViewPort(img) && originSrc != img.src && originSrc != null) {
      img.src = originSrc
    }
  }
}

export default function () {
  setInterval(action, 500)
}