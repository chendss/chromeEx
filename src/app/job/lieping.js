import qs from 'qs'
import axios from 'axios'
import SearchFilter from './searchFilter'
import { set, sortBy, sum, chunk } from 'lodash'
import { qs as toolsQs, es, q, e, average } from '@/utils/tools'
import { transferDataProcess, sortItem, filterItem, waitWindowClose, getItemDataValue, onConfirmAction } from './tools'
import { get, queryToObj, objToQuery, strFormat, sleep, pointDistance, openLoading, closeLoading, jsonParse, textToDom } from '@/utils'

const globalStore = {}

const total = function () {
  const lastDom = q('.pagerbar>a.last')
  const url = lastDom.href
  const obj = queryToObj(url)
  return get(obj, 'curPage', 1)
}

const urlList = function () {
  const href = window.location.href
  const obj = queryToObj(href)
  let result = []
  const total_ = total()
  for (let i = 2; i <= total_; i++) {
    const obj_ = { ...obj }
    obj_.curPage = i
    const search = objToQuery(obj_)
    const url = `${window.location.origin}/${window.location.pathname}?${search}`
    result.push(url)
  }
  return result
}

const requestData = async function (url) {
  const res = await axios.get(url)
  let Html = textToDom(res.data)
  const lis = es(Html, '.sojob-result .sojob-list li')
  const ul = q('.sojob-result .sojob-list')
  const baseList = es(ul, 'li')
  if (baseList.length > 600) {
    return
  }
  lis.forEach(li => {
    document.querySelector('.sojob-result .sojob-list').appendChild(li)
  })
}

const initData = async function () {
  let promiseList = []
  for (let url of urlList()) {
    promiseList.push(() => requestData(url))
  }
  const promiseLists = chunk(promiseList, 20)
  for (let ps of promiseLists) {
    await Promise.all(ps.map(fun => fun()))
    await sleep(200)
  }
}

const init = function (ul) {
  const list = es(ul, 'li')
  list.forEach(item => {
    const text = e(item, '.text-warning').innerText
    if (text.includes('面议')) {
      item.remove()
    } else {
      const jobInfo = e(item, '.job-info h3 a').href
      const id = jobInfo.split('?')[0].split('/').find(j => j.includes('html')).split('.')[0]
      const priceList = text.split('-').filter(t => !t.includes('薪')).map(t => Number(t.replace('k', '')))
      globalStore[id] = { price: average(priceList), time: 0, number: 0, 综合值: [0, 0, 0] }
      item.setAttribute('appdata', JSON.stringify(globalStore[id]))
    }
  })
}

const onConfirm = function (data, ul) {
  const list = es(ul, 'li')
  onConfirmAction(data, list, ul)
}

const batchClick = function (data, ul) {

}

export default async function () {
  openLoading()
  const ul = q('.sojob-result .sojob-list')
  globalStore.Gmap = SearchFilter.new({
    selector: '#sojob .sojob-search .search-condition-ex',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
  })
  await initData()
  init(ul)
  closeLoading()
}