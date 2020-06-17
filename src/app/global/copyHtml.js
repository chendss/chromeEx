import Html from './index.html'
import Config from '../../assets/custom'
import { q } from '@/utils/tools'
import axios from 'axios'
import { textToDom, get } from '../../utils'
import { qs } from '../../utils/tools'

const coverUrl = function () {
  const imgs = qs('img').filter(img => get(img, 'src.length', 0) > 5)
  return get(imgs, '[0].src', '')
}

const postData = async function (url_) {
  const context = document.documentElement.outerHTML
  const doc = textToDom(context)
  const html = doc.documentElement.outerHTML
  const url = url_ || (Config().copyUrl + '/copy_html')
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

const btnClick = async function () {
  postData()
}

const oncontextmenu = function (event) {
  event.preventDefault()
  postData('http://127.0.0.1:9080/copy_html')
}


export default function () {
  const DOM = Html['copy_btn']
  const body = document.body
  body.insertAdjacentHTML('beforeend', DOM)
  const btn = q('#id-copy-btn')
  btn.addEventListener('click', btnClick)
  btn.oncontextmenu = oncontextmenu
}