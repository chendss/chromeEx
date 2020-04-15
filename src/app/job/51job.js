import axios from 'axios'
import GMap from '@/common/Map'
import { q, e, es } from "@/utils/tools"
import SearchFilter from './searchFilter'
import { flatten } from 'lodash'
import { openLoading, closeLoading } from "@/utils"

const pageConfig = function () {
  const rtPrev = q('#rtPrev')
  const parent = rtPrev.parentElement
  const list = parent.innerText.split('/').map(str => Number(str.replace(/\s*/g, "")))
  const [index, total] = list
  return { index, total }
}

const globalConfig = {
  index: pageConfig().index
}
const globalStore = {}

const nextPageUrl = function (nextIndex) {
  const location = window.location
  const { href } = location
  const index = globalConfig.index
  const nextHref = href.replace(`${index}.html`, `${nextIndex}.html`)
  return nextHref
}



const requestData = async function (index) {
  const res = await axios.get(nextPageUrl(index), {
    responseType: 'blob',
    transformResponse: [
      (data) => {
        return new Promise((resolve) => {
          let reader = new FileReader()
          reader.readAsText(data, 'GBK')
          reader.onload = function (e) {
            resolve(reader.result)
          }
        })
      }
    ]
  })
  const data = await res.data
  const p = new DOMParser()
  const Html = p.parseFromString(data, "text/html")
  const list = [...Html.querySelectorAll('#resultList .el:not(.title)')].filter(item => item.querySelector('.t4').innerText != '')
  return list
}

const insertData = async function (ul) {
  const { total, index } = pageConfig()
  let promiseList = []
  for (let i = (index + 1); i < total; i++) {
    promiseList.push(requestData(i))
  }
  const res = await Promise.all(promiseList)
  const domList = flatten(res)
  domList.forEach(item => ul.appendChild(item))
}

const parsePrice = function (str) {
  let result = []
  if (str.includes('千')) {
    let s = str.slice(0, str.length - 3)
    result = s.split('-').map(i => Number(i))
  } else {
    let s = str.slice(0, str.length - 3)
    result = s.split('-').map(i => 10 * Number(i))
  }
  if (str.includes('年')) {
    result = result.map(i => Math.floor(i / 12))
  }
  return result
}

const init = function (ul) {
  const list = es(ul, '.el:not(.title)')
  for (let item of list) {
    if (item.querySelector('.t4').innerText === '') {
      item.classList.add('none')
    } else {
      const id = e(item, '.t1 input').value
      const param = {
        price: parsePrice(e(item, '.t4').innerText),
        id
      }
      globalStore[id] = param
    }
  }
}

const onConfirm = function (data, ul) {
  console.log('是多么', data)
}

const batchClick = function (ul) {

}


export default async function () {
  openLoading()
  const ul = q('#resultList')
  globalConfig.map = await GMap.new('body')
  globalConfig.searchFilter = SearchFilter.new({
    selector: '.dw_filter',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
  })
  await insertData(ul)
  init(ul)
  closeLoading()
}