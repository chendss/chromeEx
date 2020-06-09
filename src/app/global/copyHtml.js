import Html from './index.html'
import { q } from '@/utils/tools'
import axios from 'axios'

const btnClick = async function () {
  const html = document.documentElement.outerHTML
  const url = 'http://127.0.0.1:9080/copy_html'
  const title = document.title
  const res = await axios.post(url, { html, title })
  console.log('是这样吗', res)
}

export default function () {
  const DOM = Html['copy_btn']
  const body = document.body
  body.insertAdjacentHTML('beforeend', DOM)
  const btn = q('#id-copy-btn')
  btn.addEventListener('click', btnClick)
}