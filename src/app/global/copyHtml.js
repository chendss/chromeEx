import Html from './index.html'
import Config from '../../assets/custom'
import { q } from '@/utils/tools'
import axios from 'axios'
import { textToDom, get } from '../../utils'

const postData = async function (url_) {
  const context = document.documentElement.outerHTML
  const doc = textToDom(context)
  const html = doc.documentElement.outerHTML
  const url = url_ || (Config().copyUrl + '/copy_html')
  const href = window.location.href
  const res = await axios.post(url, { html, href, cover, description }, { headers: { 'Content-Type': 'application/json' } })
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
  const body = document.querySelector('html')
  body.insertAdjacentHTML('beforeend', DOM)
  const btn = q('#id-copy-btn')
  btn.addEventListener('click', btnClick)
  btn.oncontextmenu = oncontextmenu
}