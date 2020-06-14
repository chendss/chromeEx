import Html from './index.html'
import Config from '../../assets/custom'
import { q } from '@/utils/tools'
import axios from 'axios'
import { textToDom, get } from '../../utils'
import { qs } from '../../utils/tools'

const coverUrl = function () {
  const imgs = qs('img').filter(img => get(img, 'src.length', 0) > 5)
  imgs.sort((a, b) => {
    const s1 = getComputedStyle(a)
    const s2 = getComputedStyle(b)
    const status = s2.width * s2.height - s1.width * s1.height
    if (status > 0) {
      return 1
    } else if (status == 0) {
      return 0
    } else {
      return -1
    }
  })
  return get(imgs, '[0].src', '')
}

const btnClick = async function () {
  const context = document.documentElement.outerHTML
  const doc = textToDom(context)
  const scriptHtml = `<script>
    window.onbeforeunload = function () {
      return confirm('你确定要关闭吗？')
    }
  </script>`
  doc.head.insertAdjacentHTML('afterbegin', scriptHtml)
  const html = doc.documentElement.outerHTML
  const url = Config().copyUrl
  const title = document.title
  const cover = coverUrl()
  const description = get(q('meta[name="description"]'), 'content', '')
  const href = window.location.href
  const res = await axios.post(url, { html, title, href, cover, description }, { headers: { 'Content-Type': 'application/json' } })
  const code = get(res, 'data.code', null)
  if (code === '0') {
    alert('复刻成功')
  }
}


export default function () {
  const DOM = Html['copy_btn']
  const body = document.body
  body.insertAdjacentHTML('beforeend', DOM)
  const btn = q('#id-copy-btn')
  btn.addEventListener('click', btnClick)
}