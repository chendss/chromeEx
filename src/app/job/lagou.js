import qs from 'qs'
import 'jquery-modal'
import $ from 'jquery'
import axios from 'axios'
import cookies from 'js-cookie'
import Html from './lagou.html'
import SearchFilter from './searchFilter'
import GMap from '@/common/Map'
import { transferDataProcess } from './tools'
import { set, sortBy, sum } from 'lodash'
import { get, queryToObj, strFormat, sleep } from '@/utils'
import { qs as toolsQs, es, q } from '@/utils/tools'

const globalConfig = {
  pageIndex: 1,
  total: null,
  map: null
}

const getItemDataValue = function (priceList, item, data) {
  const transfer = item.transferList[0]
  const time = Number(transfer.find(t => t.text === '最短时间').value.replace('分钟', ''))
  const number = transfer.find(t => t.text === '换乘次数').value
  const price = priceList[0]
  const result = {
    price,
    time,
    number,
    综合值: [price, time, number],
  }
  return JSON.stringify(result)
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
  return result.replace('"[appdata]"', getItemDataValue(priceList, item))

}

const searchText = function () {
  const href = decodeURIComponent(window.location.href)
  const listStr = href.split('//')[1].split('/').find(l => l.includes('list_'))
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
  insertHtml(list, data)
}

const insertData = function () {
  const k = setInterval(async () => {
    if (globalConfig.total != null && globalConfig.pageIndex >= globalConfig.total) {
      clearInterval(k)
    } else {
      createContent()
    }
  }, 1.5 * 1000)
}

const createMap = async function () {
  const map = new GMap('body')
  await map.init()
  globalConfig.map = map
}

const postionMap = async function (经度, 纬度, name) {
  const id = `#${globalConfig.map.id}`
  $(id).modal()
  const map = globalConfig.map
  map.goPoint(经度, 纬度, name)
}

const sortItem = function (sortDict, perfect, o) {
  const appData = JSON.parse(o.getAttribute('appdata'))
  const type = get(sortDict, 'type', null)
  const sortType = sortDict.sortType === -1 ? 1 : -1
  const comprehensive = get(sortDict, 'comprehensive', null)
  let value = 0
  if (type === '工资') {
    value = appData.price
  } else if (type === '通勤时间') {
    value = appData.time
  } else if (type === '换乘次数') {
    value = appData.number
  } else if (comprehensive === '综合') {
    const point = perfect.split(',').map(i => Number(i))
    const [x, y, z] = appData.综合值
    const x2 = Math.pow((x - point[0]), 2)
    const y2 = Math.pow((y - point[1]), 2)
    const z2 = Math.pow((z - point[2]), 2)
    value = -1 * Math.sqrt(x2 + y2 + z2)
  } else if (comprehensive === '工资') {
    const point = perfect.split(',').map(i => Number(i))
    const [x, y, z] = appData.综合值
    const x2 = Math.pow((x - point[0] - 3000), 2)
    const y2 = Math.pow((y - point[1]), 2)
    const z2 = Math.pow((z - point[2]), 2)
    value = -1 * Math.sqrt(x2 + y2 + z2)
  }
  return sortType * value
}

const onConfirm = function (data, ul) {
  const list = es(ul, '.con_list_item')
  const sortDict = get(data, 'sort', {})
  console.log('ookkk', data)
  const perfect = q('#filterBox').querySelector('.content_row.least_box .cy_input').value
  let result = [...list]
  if ((sortDict.type != null || sortDict.comprehensive != null) && sortDict.sortType != null) {
    result = sortBy(list, (o) => sortItem(sortDict, perfect, o))
  }
  ul.innerHTML = ''
  result.forEach(item => ul.appendChild(item))
}

export default async function () {
  await createMap()
  const ul = document.querySelector('#s_position_list .item_con_list')
  ul.innerHTML = ''
  insertData()
  window.createContent = createContent
  window.postionMap = postionMap
  globalConfig.searchFilter = SearchFilter.new({
    selector: '#filterBox',
    onConfirm: (data) => onConfirm(data, ul)
  })
}