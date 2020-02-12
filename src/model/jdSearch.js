import axios from 'axios'
import { random } from '../utils/index'

let goodLength = 0

const addBtn = function () {
  const goods = document.querySelector('#J_goodsList')
  const items = [...goods.querySelectorAll('.gl-item')]
  if (goodLength !== items.length) {
    goodLength = items.length
    for (let item of items) {
      const status = item.getAttribute('status')
      if (status == null) {
        item.setAttribute('status', 'yes')
        const id = random()
        const text = item.querySelector('.p-name em').innerText
        if (text.includes('活性炭')) continue
        item.insertAdjacentHTML('beforeend', `<div class="add_item" id="${id}">添加</div>`)
        const addItem = item.querySelector(`#${id}`)
        addItem.addEventListener('click', async () => {
          const skuId = item.dataset.sku
          const price = Number(item.querySelector('.p-price i').innerText)
          let number = 1
          if (price >= 100) {
            number = Math.ceil(300 / price)
          } else if (price < 100) {
            number = Math.ceil(200 / price)
          }
          await axios.post(`http://127.0.0.1:9254/add/${skuId}`, { number })
          console.log('添加成功')
        })
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