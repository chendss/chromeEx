import { throttle } from 'lodash'

const callImgs = function () {
  const imgs = document.querySelectorAll('img')
  imgs.forEach(img => {
    const origin = img.dataset.original
    const src = img.src
    const width = img.getAttribute('width')
    const height = img.getAttribute('height')
    if (src.includes('data:image')) {
      img.src = origin
      img.style.width = `${width}px`
      img.style.height = `${height}px`
    }
  })
}

export default function () {
  window.addEventListener('scroll', throttle(callImgs, 300))
  window.addEventListener('load', callImgs)
}