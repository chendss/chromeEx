import axios from 'axios'
import GMap from '@/common/Map'
import { q, e, es } from "@/utils/tools"
import SearchFilter from './searchFilter'
import { transferDataProcess, sortItem, filterItem, getItemDataValue } from './tools'
import { flatten, chunk, isEqual, sortBy } from 'lodash'
import { openLoading, closeLoading, textToDom, sleep, dataset, datasetFind, get, jsonParse } from "@/utils"

const DB = dataset('/path/51job.db')

const pageConfig = function () {
  const rtPrev = q('#rtPrev')
  const parent = rtPrev.parentElement
  const list = parent.innerText.split('/').map(str => Number(str.replace(/\s*/g, "")))
  const [index, total] = list
  return { index, total }
}

const globalConfig = { start: 0 }
const globalStore = {}

const nextPageUrl = function (nextIndex) {
  const location = window.location
  const { href } = location
  const index = globalConfig.index
  const nextHref = href.replace(`${index}.html`, `${nextIndex}.html`)
  return nextHref
}


const getData = async function (url) {
  const res = await axios.get(url, {
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
  return { ...res, data }
}


const requestData = async function (index) {
  const items = es(document, '#resultList .el:not(.title)')
  if (items.length >= 500) {
    return []
  }
  const res = await getData(nextPageUrl(index))
  const data = await res.data
  const Html = textToDom(data)
  const list = es(Html, '#resultList .el:not(.title)').filter(item => e(item, '.t4').innerText != '')
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

const getPosition = async function (id) {
  const url = `https://search.51job.com/jobsearch/bmap/map.php?jobid=${id}`
  const mapData = await axios.get(url)
  const Html = textToDom(mapData.data)
  const input = Html.querySelector('#end')
  return [input.getAttribute('lng'), input.getAttribute('lat')].map(Number)
}

const mapFun = async function (id) {
  const obj = await datasetFind(DB, { id })
  let values = {}
  if (obj != null) {
    const { position } = obj
    values = {
      id,
      position,
      longitude: get(position, '[0]', 0),
      latitude: get(position, '[1]', 0),
    }
  } else {
    const position = await getPosition(id)
    const readPosition = await globalConfig.map.convertFrom(position, 'baidu')
    await DB.insert({ id, position: readPosition })
    values = {
      id,
      position: readPosition,
      longitude: get(readPosition, '[0]', 0),
      latitude: get(readPosition, '[1]', 0),
    }
  }
  let result = await transferDataProcess(values, globalConfig.map)
  return result
}

const getMapDataAll = async function (ids) {
  let result = {}
  let funList = ids.map(id => (() => mapFun(id)))
  const list = []
  const chunkList = chunk(funList, 50)
  for (let itemList of chunkList) {
    const res = await Promise.all(itemList.map(fun => fun()))
    list.push(...res.filter(e => e != null))
  }
  list.forEach(item => result[item.id] = item)
  return result
}

const init = async function (ul) {
  const list = es(ul, '.el:not(.title)')
  const ids = list.filter(item => e(item, '.t4').innerText !== '').map(item => e(item, '.t1 input').value)
  const mapDict = await getMapDataAll(ids)
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const id = e(item, '.t1 input').value
    const dict = mapDict[id]
    const condictions = [
      item.querySelector('.t4').innerText === '',
      isEqual(get(dict, `position`, null), [0, 0]),
      get(dict, 'transferList.length', 0) === 0,
      get(dict, 'transferListHtml', '') == '',
      get(dict, 'transferList[0][0].value', '0分钟') === '0分钟',
    ]
    if (condictions.some(c => c === true)) {
      item.classList.add('none')
    } else {
      const param = {
        price: parsePrice(e(item, '.t4').innerText),
        id,
        item: dict
      }
      item.insertAdjacentHTML('beforeend', get(dict, `transferListHtml`, ''))
      const priceList = param.price
      item.setAttribute('appdata', getItemDataValue(priceList, dict, '51job_'))
      globalStore[id] = param
    }
  }
}

const onConfirm = function (data, ul) {
  const list = es(ul, '.el:not(.title)')
  const sortDict = get(data, 'sort', {})
  const filterDict = get(data, 'filter', {})
  const perfect = q('.dw_filter').querySelector('.content_row.least_box .cy_input').value
  let result = [...list]
  if ((sortDict.type != null || sortDict.comprehensive != null) && sortDict.sortType != null) {
    result = sortBy(list, (o) => {
      const appdata = jsonParse(o.getAttribute('appdata'))
      if (appdata == null) {
        return false
      }
      return sortItem(sortDict, perfect, appdata)
    })
  }
  if (!Object.values(filterDict).every(item => JSON.stringify(item) === JSON.stringify([0, 0]))) {
    filterItem(result, filterDict)
  }
  list.forEach(ele => ul.removeChild(ele))
  result.forEach(item => {
    if (!e(item, '.t3').innerText.includes('异地招聘')) {
      ul.appendChild(item)
    }
  })
  closeLoading()
}

const selectItem = function () {
  q('.dw_tlc .chall span .check').classList.toggle('on')
  const ul = q('#resultList')
  const list = es(ul, '.el:not(.title):not(.none)').slice(globalConfig.start, globalConfig.start + 100)
  globalConfig.start = 100
  list.forEach(item => {
    const em = e(item, '.t1 em.check')
    em.click()
  })
}

export default async function () {
  openLoading()
  globalConfig.index = pageConfig().index
  const ul = q('#resultList')
  globalConfig.map = await GMap.new('body')
  globalConfig.searchFilter = SearchFilter.new({
    selector: '.dw_filter',
    onConfirm: (data) => onConfirm(data, ul),
  })
  window.selectItem = selectItem
  await insertData(ul)
  await init(ul)
  q('.dw_tlc .chall span .check').setAttribute('onclick', 'selectItem()')
  closeLoading()
}