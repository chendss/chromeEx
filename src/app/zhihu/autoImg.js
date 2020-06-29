import { get, isInViewPort, random, md5 } from '@/utils/index'
import { log, qs } from '@/utils/tools'

class Render {
  constructor() {
    this.config = {
      action: true,
      fufei: true,
      playGif: true,
    }
    this.gifDict = {}
    log('开始替换图片')
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

  async playGif () {
    const plays = qs('.ztext-gif')
    for (let p of plays) {
      const thumbnail = md5(p.dataset.thumbnail)
      if (thumbnail == null) continue
      const code = md5(p.dataset.thumbnail)
      const key = `g_${code}`
      if (this.gifDict[key] == null) {
        const click = () => {
          return new Promise(resolve => {
            p.click()
            const k = setInterval(() => {
              if (p.parentElement.classList.contains('isPlaying')) {
                this.gifDict[key] = p.src
                clearInterval(k)
                resolve()
              }
            }, 50)
          })
        }
        await click()
      } else {
        const code = md5(p.dataset.thumbnail)
        const key = `g_${code}`
        const url = this.gifDict[key]
        if (p.src !== url) {
          p.src = url
          p.parentElement.classList.add('isPlaying')
        }
      }
    }
  }

  render () {
    setTimeout(async () => {
      for (let key of Object.keys(this.config)) {
        const fun = this[key].bind(this)
        if (this.config[key]) {
          await fun()
        }
      }
      this.render()
    }, 500)
  }
}



export default function () {
  const render = new Render()
  render.render()
}