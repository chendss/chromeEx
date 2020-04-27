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
  max: 50
}

// proxy({
//   //请求发起前进入
//   onRequest: (config, handler) => {
//     const { url } = config
//     if (url.includes('fe-api.zhaopin.com/c/i/sou') && config.body != null) {
//       const body = jsonParse(config.body)
//       globalConfig.itemsConfig = { body, url }
//     }
//     handler.next(config)
//   },
//   //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
//   onError: (err, handler) => {
//     console.log(err.type, 'onError')
//     handler.next(err)
//   },
//   onResponse: (response, handler) => {
//     const { config } = response
//     const { url } = config
//     if (url.includes('fe-api.zhaopin.com/c/i/sou') && config.body != null) {
//       console.log('hah', response)
//     }
//     handler.next(response)
//   }
// })

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

const insertGlobalData = function () {
  return new Promise(resolve => {
    const k = setInterval(() => {
      if (window.__INITIAL_STATE__ != null) {
        const test = cloneDeep(window.__INITIAL_STATE__)
        console.log('popop', test)
        window.__INITIAL_STATE__ = []
        resolve()
        clearInterval(k)
      }
    }, 50)
  })
}

const initData = async function (ul) {
  const nextBtn = q('#pagination_content .btn.soupager__btn.soupager__btn--disable')

}

export default async function () {
  openLoading()
  const ul = q('#listContent')
  // await insertGlobalData()
  globalConfig.map = await GMap.new('body')
  window.changeCity = changeCity
  document.querySelector('#root').insertAdjacentHTML('beforeend', Html['change_city'])
  await waitResult()
  globalConfig.SearchFilter = SearchFilter.new({
    selector: '#search',
    // onConfirm: (data) => onConfirm(data, ul),
    // batchClick: (data) => batchClick(ul),
    // allCheck: () => allCheck(ul),
    // filterEmpty: () => filterEmpty(ul),
  })
  await initData(ul)
  // await init(ul)
  closeLoading()
}