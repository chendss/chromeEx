import axios from 'axios'
import { random } from '../utils/index'

let goodLength = 0

const extraHtml = function (item, text) {
  const id = random()
  return '<div></div>'
}

const addBtn = function () {
  const goods = document.querySelector('#J_goodsList')
  const items = [...goods.querySelectorAll('.gl-item')]
  if (goodLength !== items.length) {
    goodLength = items.length
    for (let item of items) {
      const status = item.getAttribute('status')
      if (status == null) {
        item.setAttribute('status', 'yes')
        const text = item.querySelector('.p-name em').innerText
        if (text.includes('活性炭')) continue
        item.insertAdjacentHTML('beforeend', extraHtml(item, text))
      }
    }
  }

}

export default function () {
  document.body.insertAdjacentHTML('beforeend', `<div id="id-reset-btn">重置</div>`)
  document.querySelector('#id-reset-btn').addEventListener('click', () => {
    axios.get(`http://127.0.0.1:9254/reset`)
  })
  setInterval(() => {
    addBtn()
  }, 300)
}