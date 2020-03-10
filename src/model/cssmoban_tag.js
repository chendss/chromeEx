
import { queryToObj, get, random } from '../utils/index'
import Nedb from 'nedb'
import DB from '../utils/DB'
import axios from 'axios'

const dataset = new Nedb({
  filename: '/data/cli.db',
  autoload: true
})

const datasetFind = function (href) {
  return new Promise((resolve) => {
    dataset.findOne({ id: href }, (err, docs) => {
      resolve(docs)
    })
  })
}

const baseAction = async function (item, selector, callback = function () { }) {
  const a = item.querySelector('a')
  const href = a.href
  const obj = await datasetFind(href)
  let data = '<html></html>'
  if (obj != null) {
    data = obj.data
  } else {
    let res = await axios.get(href)
    data = get(res, 'data', '<html></html>')
    dataset.insert({ id: href, data })
  }
  const p = new DOMParser()
  const Html = p.parseFromString(data, "text/html")
  const down = Html.querySelector(selector)
  const url = down.href
  callback(down, url)
}

const query = async function (item) {
  await baseAction(item, '.button.btn-demo', (dom, url) => {
    window.open(url)
  })
}

const down = async function (item) {
  await baseAction(item, '.button.btn-down', (dom, url) => {
    window.open(url)
  })
}


export default function () {
  setInterval(() => {
    const list = document.querySelectorAll('.thumbItem.clearfix li:not(.bg-ads)')
    list.forEach(item => {
      const status = item.getAttribute('status')
      if (status !== 'haha') {
        const html = `
        <div class="btn-box">
          <div class="query">查看</div>
          <div class="down">下载</div>
        </div>
      `
        item.insertAdjacentHTML('beforeend', html)
        item.querySelector('.btn-box .query').addEventListener('click', () => query(item))
        item.querySelector('.btn-box .down').addEventListener('click', () => down(item))
        item.setAttribute('status', 'haha')
      }
    })
  }, 500)
}