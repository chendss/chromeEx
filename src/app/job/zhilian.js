import qs from 'qs'
import axios from 'axios'
import GMap from '@/common/Map'
import Html from './zhilian.html'
import SearchFilter from './searchFilter'
import { set, sortBy, sum, chunk, cloneDeep } from 'lodash'
import { qs as toolsQs, es, q, e, average } from '@/utils/tools'
import { transferDataProcess, sortItem, filterItem, waitWindowClose, getItemDataValue, onConfirmAction } from './tools'
import { get, queryToObj, objToQuery, strFormat, sleep, pointDistance, openLoading, dataset, closeLoading, jsonParse, textToDom, iframeRequest, datasetFind } from '@/utils'

const DB = dataset('/path/zhilian_.db')
const globalStore = {}
const globalConfig = {
  max: 50
}

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