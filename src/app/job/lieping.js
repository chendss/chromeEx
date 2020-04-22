import qs from 'qs'
import axios from 'axios'
import GMap from '@/common/Map'
import SearchFilter from './searchFilter'
import { set, sortBy, sum, chunk } from 'lodash'
import { qs as toolsQs, es, q, e, average } from '@/utils/tools'
import { transferDataProcess, sortItem, filterItem, waitWindowClose, getItemDataValue, onConfirmAction } from './tools'
import { get, queryToObj, objToQuery, strFormat, sleep, pointDistance, openLoading, closeLoading, jsonParse, textToDom, iframeRequest } from '@/utils'

const globalStore = {}
const globalConfig = {}

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

const remoteLiProcess = async function (url) {
  let result = {}
  const { dom } = await iframeRequest(url)
  const value = dom.querySelector('#location').value
  const [longitude, latitude] = [null, undefined, ''].includes(value) ? [] : value.split(',').map(i => Number(i))
  result = await transferDataProcess({ latitude, longitude }, globalConfig.map)
  return result
}

const requestData = async function (url) {
  const res = await axios.get(url)
  let Html = textToDom(res.data)
  const list = es(Html, '.sojob-result .sojob-list li')
  const ul = q('.sojob-result .sojob-list')
  const baseList = es(ul, 'li')
  if (baseList.length > 50) {
    return
  }
  const ul = document.querySelector('.sojob-result .sojob-list')
  list.forEach(item => ul.appendChild(item))
}

const initData = async function () {
  let promiseList = []
  for (let url of urlList()) {
    promiseList.push(() => requestData(url))
  }
  const promiseLists = chunk(promiseList, 10)
  for (let ps of promiseLists) {
    await Promise.all(ps.map(fun => fun()))
    await sleep(200)
  }
}

const init = function (ul) {
  const list = es(ul, 'li')
  for (let item of list) {
    const text = e(item, '.text-warning').innerText
    if (text.includes('面议')) {
      item.remove()
    } else {
      const jobInfo = e(item, '.job-info h3 a').href
      const id = jobInfo.split('?')[0].split('/').find(j => j.includes('html')).split('.')[0]
      const dict = {}
      dict.priceList = text.split('-').filter(t => !t.includes('薪')).map(t => Number(t.replace('k', '')))
      const values = await remoteLiProcess(jobInfo)
      globalStore[id] = { price: average(priceList), time: 0, number: 0, 综合值: [0, 0, 0] }
      item.setAttribute('appdata', JSON.stringify(globalStore[id]))
    }
  }
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
  globalConfig.map = await GMap.new('body')
  globalConfig.SearchFilter = SearchFilter.new({
    selector: '#sojob .sojob-search .search-condition-ex',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
  })
  await initData()
  init(ul)
  closeLoading()
}