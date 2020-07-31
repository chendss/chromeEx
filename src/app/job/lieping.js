import qs from 'qs'
import axios from 'axios'
import GMap from '@/common/Map'
import Html from './lieping.html'
import SearchFilter from './searchFilter'
import { set, sortBy, sum, chunk } from 'lodash'
import { qs as toolsQs, es, q, e, average } from '@/utils/tools'
import { transferDataProcess, sortItem, filterItem, waitWindowClose, getItemDataValue, onConfirmAction } from './tools'
import { get, queryToObj, objToQuery, strFormat, sleep, pointDistance, openLoading, dataset, closeLoading, jsonParse, textToDom, iframeRequest, datasetFind } from '@/utils'

const DB = dataset('/path/liepin_.db')
const globalStore = {}
const globalConfig = {
  max: 300
}

const maxPageDict = function () {
  const lastDom = q('.pagerbar>a.last')
  if (lastDom == null) {
    return 1
  }
  const url = lastDom.href
  const obj = queryToObj(url)
  return { total: get(obj, 'curPage', 1), url }
}

const urlList = function () {
  const { total, url } = maxPageDict()
  const search = `curPage=${total}`
  let result = []
  for (let i = 1; i <= total; i++) {
    const url_ = url.replace(search, `curPage=${i}`)
    result.push(url_)
  }
  return result
}


const remoteLiProcess = async function (url, id) {
  let result = {}
  let value = null
  let locationDict = await datasetFind(DB, { id })
  if (locationDict != null) {
    console.log('缓存取值')
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
  const oldList = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (i % 8 === 0) {
      await sleep(500)
    }
    const text = e(item, '.text-warning').innerText
    const icon = e(item, '.icon.icon-blue-triangle')
    const jobInfo = e(item, '.job-info h3 a').href
    const id = jobInfo.split('?')[0].split('/').find(j => j.includes('html')).split('.')[0]
    if (oldList.includes(id)) {
      item.remove()
    } else {
      oldList.push(id)
    }
    if (text.includes('面议') || icon != null) {
      item.remove()
    } else {
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

const insertScript = async function (doc) {
  const scritp = doc.createElement('script')
  const text = Html['iframe_script'].replace('<script ident="iframe_script">', '').replace('</script>', '')
  scritp.text = text
  doc.body.appendChild(scritp)
  await sleep(4500)
}

const batchClick = async function (ul) {
  openLoading()
  const check_list = es(ul, 'li:not(.none).check_')
  let promiseList = []
  for (let i = 0; i < check_list.length; i++) {
    const item = check_list[i]
    const jobInfo = e(item, '.job-info h3 a').href
    promiseList.push(() => iframeRequest(jobInfo, insertScript))
    if (i % 8 === 0 || i === check_list.length - 1) {
      await Promise.all(promiseList.map(f => f()))
      await sleep(1500)
      promiseList = []
    }
    const btn = item.querySelector('.cy_btn.check_btn')
    setTimeout(() => btn.click(), 300)
  }
  closeLoading()
}

const allCheck = function (ul) {
  const list = es(ul, 'li:not(.none) .check_btn')
  list.forEach(btn => {
    setTimeout(() => {
      btn.click()
    }, 300)
  })
}

const main = async function () {
  openLoading()
  const ul = q('.sojob-result .sojob-list')
  window.select = select
  globalConfig.map = await GMap.new('body')
  globalConfig.SearchFilter = SearchFilter.new({
    selector: '#sojob .sojob-search .search-condition-ex',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
    allCheck: () => allCheck(ul),
    items: es(ul, 'li'),
  })
  await initData()
  await init(ul)
  closeLoading()
}

export default function () {
  const startBtn = Html['startBtn']
  document.body.insertAdjacentHTML('beforeend', startBtn)
  const btn = q('#id-start-btn')
  btn.addEventListener('click', main)
}