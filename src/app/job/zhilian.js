import qs from 'qs'
import axios from 'axios'
import GMap from '@/common/Map'
import Html from './zhilian.html'
import SearchFilter from './searchFilter'
import { set, sortBy, sum, chunk, cloneDeep } from 'lodash'
import { qs as toolsQs, es, q, e, average } from '@/utils/tools'
import { transferDataProcess, sortItem, filterItem, waitWindowClose, getItemDataValue, onConfirmAction } from './tools'
import { get, queryToObj, objToQuery, strFormat, sleep, pointDistance, openLoading, dataset, closeLoading, jsonParse, textToDom, iframeRequest, datasetFind } from '@/utils'
import { proxy, unProxy } from "ajax-hook"

const DB = dataset('/path/zhilian_.db')
const globalStore = {}
const globalConfig = {
  max: 50,
  start: 0
}

const moreData = async function () {
  console.log('this')
  const body = globalConfig.itemsConfig.body
  const url = globalConfig.itemsConfig.url
  const pageSize = Number(get(body, 'pageSize', '90'))
  const response = get(globalConfig, 'itemsConfig.response.response', {})
  const count = get(response, 'data.count', 0)
  let lastPageIndex = Math.ceil(count / pageSize)
  let resList = []
  for (let i = 0; i <= lastPageIndex; i++) {
    const data = { ...body, start: i * pageSize, custom_: true }
    let apiValue = await axios.post(url, data)
    resList.push(apiValue.data)
    await sleep(800)
  }
  let result = {
    ...resList[0],
    data: []
  }
  for (let obj of resList) {
    result.data.push(...(obj.data.results || []))
  }
  globalConfig.allItems = result
}

proxy({
  //请求发起前进入
  onRequest: (config, handler) => {
    const { url } = config
    if (url.includes('fe-api.zhaopin.com/c/i/sou') && config.body != null) {
      const body = jsonParse(config.body)
      globalConfig.itemsConfig = { body, url }
    }
    handler.next(config)
  },
  //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
  onError: (err, handler) => {
    console.log(err.type, 'onError')
    handler.next(err)
  },
  onResponse: (response, handler) => {
    const { config } = response
    const { url } = config
    if (url.includes('fe-api.zhaopin.com/c/i/sou') && config.body != null) {
      if (jsonParse(config.body).custom_ !== true) {
        const newResponse = jsonParse(response.response)
        if (globalConfig.allItems != null) {
          newResponse.data.results = globalConfig.allItems.data
          globalConfig.itemsConfig.response = { ...response, response: newResponse }
          handler.next({ ...response, response: JSON.stringify(newResponse) })
        } else {
          globalConfig.itemsConfig.response = { ...response, response: newResponse }
          handler.next(response)
        }
      } else {
        handler.next(response)
      }
    } else {
      handler.next(response)
    }
  }
})

const waitResult = function () {
  return new Promise(resolve => {
    const k = setInterval(() => {
      const list = toolsQs('#listContent .contentpile__content__wrapper')
      if (list.length >= 1) {
        resolve()
        clearInterval(k)
      }
    }, 300)
  })
}

const changeCity = function () {
  window.location.href = 'https://www.zhaopin.com/citymap'
}

const initData = async function (ul) {
  const btn = q('#pagination_content .soupager .soupager__index:not(.soupager__index--active)')
  btn && btn.click()
  setTimeout(() => {
    const listItemPile = q('#listItemPile')
    const num = toolsQs('#listContent>div').length
    listItemPile.insertAdjacentHTML('afterBegin', `<div class="number_">共${num}条数据</div>`)
  }, 2000)
}

const main = async function () {
  openLoading()
  const ul = q('#listContent')
  // await insertGlobalData()
  globalConfig.map = await GMap.new('body')
  window.changeCity = changeCity
  await waitResult()
  globalConfig.SearchFilter = SearchFilter.new({
    selector: '#search',
    // onConfirm: (data) => onConfirm(data, ul),
    // batchClick: (data) => batchClick(ul),
    // allCheck: () => allCheck(ul),
    // filterEmpty: () => filterEmpty(ul),
  })
  document.querySelector('body').insertAdjacentHTML('beforeend', Html['change_city'])
  await moreData()
  await initData(ul)
  closeLoading()
}

export default function () {
  const startBtn = Html['startBtn']
  document.body.insertAdjacentHTML('beforeend', startBtn)
  const btn = q('#id-start-btn')
  btn.addEventListener('click', main)
}