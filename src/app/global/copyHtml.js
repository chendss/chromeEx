import axios from 'axios'
import './styles/copy.scss'
import Html from './index.html'
import { q } from '@/utils/tools'
import Config from '../../assets/custom'
import { textToDom, get } from '../../utils'

const postData = async function (url_) {
  const btn = q('#id-copy-btn')
  btn.setAttribute('loading', 'true')
  try {
    const context = document.documentElement.outerHTML
    const doc = textToDom(context)
    const html = doc.documentElement.outerHTML
    const url = url_ || (Config().copyUrl + '/copy_html')
    const href = window.location.href
    const res = await axios.post(url, { html, href }, { headers: { 'Content-Type': 'application/json' } })
    const code = get(res, 'data.code', null)
    if (code === '0') {
      alert('复刻成功')
    }
  } catch (error) {
    console.log('抛出异常', error)
  }
  btn.setAttribute('loading', 'false')
}

const btnClick = async function () {
  postData()
}

const oncontextmenu = function (event) {
  event.preventDefault()
  postData('http://127.0.0.1:9080/copy_html')
}


export default function () {
  if (['192.168', 'localhost:'].some(s => window.location.href.includes(s))) {
    return
  }
  const DOM = Html['copy_btn']
  const body = document.querySelector('html')
  body.insertAdjacentHTML('beforeend', DOM)
  const btn = q('#id-copy-btn')
  btn.addEventListener('click', btnClick)
  btn.oncontextmenu = oncontextmenu
}