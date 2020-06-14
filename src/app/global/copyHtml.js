import Html from './index.html'
import { q } from '@/utils/tools'
import axios from 'axios'
import { textToDom, get } from '../../utils'

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
  const url = 'http://127.0.0.1:9080/copy_html'
  const title = document.title
  const href = window.location.href
  const res = await axios.post(url, { html, title, href }, { headers: { 'Content-Type': 'application/json' } })
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