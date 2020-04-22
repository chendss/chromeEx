import qs from 'qs'
import axios from 'axios'
import GMap from '@/common/Map'
import SearchFilter from './searchFilter'
import { set, sortBy, sum, chunk } from 'lodash'
import { qs as toolsQs, es, q, e, average } from '@/utils/tools'
import { transferDataProcess, sortItem, filterItem, waitWindowClose, getItemDataValue, onConfirmAction } from './tools'
import { get, queryToObj, objToQuery, strFormat, sleep, pointDistance, openLoading, dataset, closeLoading, jsonParse, textToDom, iframeRequest, datasetFind } from '@/utils'

const DB = dataset('/path/liepin_.db')
const globalStore = {}
const globalConfig = {
  max: 100
}

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
    const search = decodeURIComponent(objToQuery(obj_))
    const url = `${window.location.origin}${window.location.pathname}?${search}`
    result.push(url)
  }
  return result
}


const remoteLiProcess = async function (url, id) {
  let result = {}
  let value = null
  let locationDict = await datasetFind(DB, { id })
  if (locationDict != null) {
    value = locationDict['value']
  } else {
    const iframeDict = await iframeRequest(url)
    if (iframeDict == null) {
      return null
    } else {
      const doc = iframeDict.doc
      const location = doc.querySelector('#location')
      value = get(location, 'value', '0,0')
      DB.insert({ id, value })
    }
  }
  const [longitude, latitude] = [null, undefined, ''].includes(value) ? [] : value.split(',').map(i => Number(i))
  result = await transferDataProcess({ latitude, longitude }, globalConfig.map)
  return result
}

const requestData = async function (url) {
  const res = await axios.get(url)
  let Html = textToDom(res.data)
  const list = [...Html.querySelectorAll('.sojob-result .sojob-list li')]
  const ul = q('.sojob-result .sojob-list')
  const baseList = es(ul, 'li')
  if (baseList.length > globalConfig.max) {
    return
  }
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

const init = async function (ul) {
  const list = es(ul, 'li')
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (i % 8 === 0) {
      await sleep(500)
    }
    const text = e(item, '.text-warning').innerText
    const icon = e(item, '.icon.icon-blue-triangle')
    if (text.includes('面议') || icon != null) {
      item.remove()
    } else {
      const jobInfo = e(item, '.job-info h3 a').href
      const id = jobInfo.split('?')[0].split('/').find(j => j.includes('html')).split('.')[0]
      const priceList = text.split('-').filter(t => !t.includes('薪')).map(t => Number(t.replace('k', '')))
      const values = await remoteLiProcess(jobInfo, id)
      if (values == null) {
        item.remove()
      } else {
        const oo = getItemDataValue(priceList, values, 'leping_')
        globalStore[id] = jsonParse(oo)
        item.setAttribute('appdata', oo)
        item.setAttribute('id', `id-${id}`)
        item.insertAdjacentHTML('beforeend', get(values, `transferListHtml`, ''))
        item.insertAdjacentHTML('beforeend', `<button class="cy_btn check_btn" onclick="select(${id})">选中</button>`)
      }
    }
  }
}

const select = function (id) {
  const li = q(`#id-${id}`)
  li.classList.toggle('check_')
  const btn = e(li, '.cy_btn')
  btn.innerText = btn.innerText === '选中' ? '已选中' : '选中'
  btn.setAttribute('type', btn.innerText === '选中' ? '' : 'p')
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
  window.select = select
  globalConfig.map = await GMap.new('body')
  globalConfig.SearchFilter = SearchFilter.new({
    selector: '#sojob .sojob-search .search-condition-ex',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
  })
  await initData()
  await init(ul)
  closeLoading()
}