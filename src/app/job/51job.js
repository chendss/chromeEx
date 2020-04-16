import axios from 'axios'
import GMap from '@/common/Map'
import { q, e, es } from "@/utils/tools"
import SearchFilter from './searchFilter'
import { flatten, chunk, isEqual } from 'lodash'
import { openLoading, closeLoading, textToDom, sleep, dataset, datasetFind } from "@/utils"

const DB = dataset('/path/51job.db')

const pageConfig = function () {
  const rtPrev = q('#rtPrev')
  const parent = rtPrev.parentElement
  const list = parent.innerText.split('/').map(str => Number(str.replace(/\s*/g, "")))
  const [index, total] = list
  return { index, total }
}

const globalConfig = {}
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
  const res = await getData(nextPageUrl(index))
  const data = await res.data
  const Html = textToDom(data)
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

const getMapDataAll = async function (ids) {
  let result = {}
  let funList = []
  for (let id of ids) {
    const fun = async () => {
      const obj = await datasetFind(DB, { id })
      if (obj != null) {
        return { id, position: obj.position }
      } else {
        const url = `https://search.51job.com/jobsearch/bmap/map.php?jobid=${id}`
        const mapData = await axios.get(url)
        const Html = textToDom(mapData.data)
        const input = Html.querySelector('#end')
        const position = [input.getAttribute('lng'), input.getAttribute('lat')].map(i => Number(i))
        await DB.insert({ id, position })
        return { position, id }
      }
    }
    funList.push(fun)
  }
  const list = []
  const chunkList = chunk(funList, 30)
  for (let itemList of chunkList) {
    const res = await Promise.all(itemList.map(fun => fun()))
    list.push(...res)
    await sleep(50)
  }
  list.forEach(item => result[item.id] = item.position)
  return result
}

const init = async function (ul) {
  const list = es(ul, '.el:not(.title)')
  const ids = list.filter(item => e(item, '.t4').innerText !== '').map(item => e(item, '.t1 input').value)
  const mapDict = await getMapDataAll(ids)
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const id = e(item, '.t1 input').value
    if (item.querySelector('.t4').innerText === '' || isEqual(mapDict[id], [0, 0])) {
      item.classList.add('none')
    } else {
      const param = {
        price: parsePrice(e(item, '.t4').innerText),
        id,
        position: mapDict[id]
      }
      globalStore[id] = param
    }
  }
}

const onConfirm = function (data, ul) {
  console.log('是多么', data, globalStore)
}

const batchClick = function (ul) {

}


export default async function () {
  openLoading()
  globalConfig.index = pageConfig().index
  const ul = q('#resultList')
  globalConfig.map = await GMap.new('body')
  globalConfig.searchFilter = SearchFilter.new({
    selector: '.dw_filter',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
  })
  await insertData(ul)
  await init(ul)
  closeLoading()
}