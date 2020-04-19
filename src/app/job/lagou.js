import qs from 'qs'
import 'jquery-modal'
import $ from 'jquery'
import axios from 'axios'
import DB from '@/utils/DB'
import cookies from 'js-cookie'
import Html from './lagou.html'
import GMap from '@/common/Map'
import SearchFilter from './searchFilter'
import { set, sortBy, sum } from 'lodash'
import { qs as toolsQs, es, q, e } from '@/utils/tools'
import { transferDataProcess, sortItem, filterItem, waitWindowClose, getItemDataValue } from './tools'
import { get, queryToObj, strFormat, sleep, pointDistance, openLoading, closeLoading, jsonParse } from '@/utils'

const globalConfig = {
  pageIndex: 1,
  total: null,
  map: null
}

const createAllData = function (item) {
  const { positionId, showId } = item
  const newItem = { positionId, showId }
  delete newItem.transferListHtml
  return JSON.stringify(newItem)
}

const itemHtml = function (item, data) {
  const positionId = get(item, 'positionId', '')
  const showId = get(data, 'showId', '')
  const priceList = get(item, 'salary', '').split('-').map(p => Number(p.replace('k', '')))
  let result = strFormat(Html['con_list_item'], {
    showId,
    ...item,
    positionId,
    minprice: priceList[0],
    maxprice: priceList[1],
    price: JSON.stringify(priceList),
    averageprice: Math.floor(sum(priceList) / priceList.length),
    li_b_l: [item.secondType, ...get(item, 'skillLables', [])].map(label => (`<span title="${label}">${label}</span>`)).join('\n'),
    line: get(item, 'linestaion', '无路线').split(';').map(l => (`<div class="line-box"><span title="${l}">${l}</span></div>`)).join('\n'),
    companyLabelList: get(item, 'companyLabelList', []).map(lable => (`<div class="line-box"><span title="${lable}">${lable}</span></div>`)).join('\n'),
  })
  result = result.replace('"[transferList]"', JSON.stringify(item.transferList))
  result = result.replace('"[appdata]"', getItemDataValue(priceList, item, 'lagou_'))
  return result.replace('"[alldata]"', createAllData(item))
}

const searchText = function () {
  const href = decodeURIComponent(window.location.href)
  const href_ = href.split('?')[0]
  const listStr = href_.split('//')[1].split('/').find(l => l.includes('list_'))
  const text = listStr.split('_')[1]
  return text
}

const pageDataConfig = function () {
  const url = 'https://www.lagou.com/jobs/positionAjax.json'
  const config = {
    params: {
      city: '广州',
      needAddtionalResult: false,
      ...queryToObj(),
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  const requestData = qs.stringify({
    first: true,
    kd: searchText(),
    pn: globalConfig.pageIndex,
  })
  const param = [url, requestData, config]
  return param
}

const resultDataAction = function (res) {
  const content = get(res, 'data.content', {})
  const data = get(content, 'positionResult', {})
  const pageNo = get(content, 'pageNo', 1)
  globalConfig.pageIndex = pageNo + 1
  const total = get(data, 'totalCount', 1)
  const totalPageSize = Math.ceil(total / get(data, 'resultSize', 15))
  set(globalConfig, 'total', totalPageSize)
  set(data, 'showId', get(res, 'data.showId', ''))
  set(data, 'totalPageSize', totalPageSize)
  set(data, 'pageNo', pageNo)
  return data
}

const insertHtml = async function (list, data) {
  const ul = document.querySelector('#s_position_list .item_con_list')
  let html = []
  for (let item of list) {
    let newItem = await transferDataProcess(item, globalConfig.map)
    if (get(newItem, 'transferList.length', 0) <= 0) {
      continue
    }
    html.push(itemHtml(newItem, data))
    if (!window.keep) {
      console.log('非缓存取值', newItem)
      await sleep(0.2)
    }
  }
  ul.insertAdjacentHTML('beforeend', html.join('\n'))
  const li = ul.querySelectorAll('li')
  li.forEach(item => {
    if (!item.classList.contains('my-item')) {
      item.remove()
    }
  })
}

const createContent = async function () {
  if (globalConfig.total != null && globalConfig.pageIndex >= globalConfig.total) {
    return
  }
  const res = await axios.post(...pageDataConfig())
  const data = resultDataAction(res)
  const list = get(data, 'result', [])
  return insertHtml(list, data)
}

const insertData = async function () {
  let status = globalConfig.total != null && globalConfig.pageIndex >= globalConfig.total
  while (!status) {
    await createContent()
    const ul = document.querySelector('#s_position_list .item_con_list')
    const items = es(ul, '.con_list_item')
    await sleep(800)
    if (items.length >= 500) {
      status = true
    } else {
      status = globalConfig.total != null && globalConfig.pageIndex >= globalConfig.total
    }
  }
}

const postionMap = async function (经度, 纬度, name) {
  const id = `#${globalConfig.map.id}`
  $(id).modal()
  const map = globalConfig.map
  map.goPoint(经度, 纬度, name)
}

const onConfirm = function (data, ul) {
  openLoading()
  const list = es(ul, '.con_list_item')
  const sortDict = get(data, 'sort', {})
  const filterDict = get(data, 'filter', {})
  const perfect = q('#filterBox').querySelector('.content_row.least_box .cy_input').value
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
  ul.innerHTML = ''
  result.forEach(item => ul.appendChild(item))
  closeLoading()

}

const removeChild = function (parent, dom) {
  try {
    parent.removeChild(dom)
  } catch (error) {

  }
}

const sendDoc = function (target, positionId, showId) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe')
    iframe.classList.add('empty_box')
    iframe.src = `https://www.lagou.com/jobs/${positionId}.html?show=${showId}`
    const body = q('body')
    body.insertAdjacentElement('beforeend', iframe)
    iframe.onload = async () => {
      try {
        const iframeWin = iframe.contentWindow
        const doc = iframeWin.document
        const scritp = doc.createElement('script')
        const text = Html['iframe_script'].replace('<script ident="iframe_script">', '').replace('</script>', '')
        scritp.text = text
        doc.body.appendChild(scritp)
        await sleep(3000)
        removeChild(body, iframe)
      } catch (error) {
        console.log('报错哈', error)
        window.open(iframe.src)
        body.removeChild(iframe)
        resolve()
      }
    }
  })
}

const batchClick = async function (ul) {
  openLoading()
  const list = es(ul, '.con_list_item.my-item')
  const filterList = list.filter(item => !item.classList.contains('none')).slice(0, 40)
  for (let div of filterList) {
    const btn = e(div, '.cy_btn.send_doc')
    const data = { ...jsonParse(div.getAttribute('alldata')) }
    const { positionId, showId } = data
    await sendDoc(btn, positionId, showId)
  }
  closeLoading()
}

const check = function (ul) {
  const list = es(ul, '.con_list_item.my-item')
  const div = list[0]
  const btn = e(div, '.cy_btn.send_doc')
  btn.click()
}

export default async function () {
  const href = window.location.href
  if (href.includes('sec.lagou')) {
    return
  }
  openLoading()
  const ul = document.querySelector('#s_position_list .item_con_list')
  ul.innerHTML = ''
  globalConfig.map = await GMap.new('body')
  window.createContent = createContent
  window.postionMap = postionMap
  window.sendDoc = sendDoc
  globalConfig.searchFilter = SearchFilter.new({
    selector: '#filterBox',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
    check: () => check(ul)
  })
  await insertData()
  closeLoading()
}