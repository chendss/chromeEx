import { get, isInViewPort } from '../../utils/index'

class Render {
  constructor() {
    this.config = {
      action: true,
      fufei: true
    }
  }
  action () {
    const imgs = [...document.querySelectorAll('img')]
    for (let img of imgs) {
      const originSrc = get({ ...img.dataset }, 'original', null)
      if (isInViewPort(img) && originSrc != img.src && originSrc != null) {
        img.src = originSrc
      }
    }
  }
  fufei () {
    const items = [...document.querySelectorAll('.List-item')]
    for (let item of items) {
      const PurchaseBtn = item.querySelector('.PurchaseBtn-text')
      if (PurchaseBtn != null && PurchaseBtn.innerHTML.includes('完整内容')) {
        item.classList.add('none')
      }
    }
  }

  render () {
    setInterval(() => {
      for (let key of Object.keys(this.config)) {
        const fun = this[key].bind(this)
        if (this.config[key]) {
          fun()
        }
      }
    }, 500)
  }
}



export default function () {
  const render = new Render()
  render.render()
}