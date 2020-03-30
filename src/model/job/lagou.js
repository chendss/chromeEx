import qs from 'qs'
import 'jquery-modal'
import $ from 'jquery'
import axios from 'axios'
import cookies from 'js-cookie'
import Html from './lagou.html'
import GMap from '../../common/Map'
import { transferDataProcess } from './tools'
import { set, sortBy } from 'lodash'
import { get, queryToObj, strFormat, sleep } from '../../utils'

const globalConfig = {
  pageIndex: 1,
  total: null,
  map: null
}

const priceDict = function () {
  const list = ['0-不限', ... new Array(22).fill('0')].map((_, index) => `${index + 3}-${index + 3}k以上`)
  return list
}

const 工资筛选 = function (actionKey, ) {
  const list = priceDict()
  const li = list.map(item => {
    const [price, text] = item.split('-')
    return `<li><a rel="nofollow" href="javascript:;" onclick="${actionKey}(${Number(price)})">${text}</a></li>`
  })
  return `<ul>${li.join('\n')}</ul>`
}

const itemHtml = function (item, data) {
  const positionId = get(item, 'positionId', '')
  const showId = get(data, 'showId', '')
  const priceList = get(item, 'salary', '').split('-').map(p => Number(p.replace('k', '')))
  return strFormat(Html['con_list_item'], {
    showId,
    ...item,
    positionId,
    minprice: priceList[0],
    maxprice: priceList[1],
    price: priceList.join('-'),
    li_b_l: [item.secondType, ...get(item, 'skillLables', [])].map(label => (`<span title="${label}">${label}</span>`)).join('\n'),
    line: get(item, 'linestaion', '无路线').split(';').map(l => (`<div class="line-box"><span title="${l}">${l}</span></div>`)).join('\n'),
    companyLabelList: get(item, 'companyLabelList', []).map(lable => (`<div class="line-box"><span title="${lable}">${lable}</span></div>`)).join('\n'),
  })
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

const changePrice = function (price) {
  const textDom = document.querySelector('#order .item.salary.selectUI .selectUI-text.text>span')
  const list = document.querySelectorAll('.my-item')
  const priceList = priceDict()
  const text = priceList.find(item => item.split('-')[0] === price + '').split('-')[1]
  textDom.innerHTML = text
  list.forEach(item => {
    const minPrice = item.getAttribute('price').split('-')[0]
    if (Number(minPrice) < price) {
      item.classList.add('none')
    } else {
      item.classList.remove('none')
    }
  })
}

const changeSort = function () {
  const a_list = document.querySelectorAll('#order .item.order a')
  a_list.forEach((a, index) => {
    a.href = 'javascript:;'
    a.innerHTML = index === 0 ? '从低到高' : '从高到低'
    a.addEventListener('click', () => {
      a_list.forEach(a => a.classList.remove('active'))
      a.classList.add('active')
      if (index === 0) {
        const parent = document.querySelector('#s_position_list .item_con_list')
        const items = parent.querySelectorAll('.my-item')
        parent.innerHTML = sortBy([...items], o => Number(o.getAttribute('minprice'))).map(item => item.outerHTML).join('\n')
      } else {
        const parent = document.querySelector('#s_position_list .item_con_list')
        const items = parent.querySelectorAll('.my-item')
        parent.innerHTML = sortBy([...items], o => -1 * Number(o.getAttribute('minprice'))).map(item => item.outerHTML).join('\n')
      }
    })
  })
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

export default async function () {
  await createMap()
  const ul = document.querySelector('#s_position_list .item_con_list')
  ul.innerHTML = ''
  insertData()
  window.createContent = createContent
  window.changePrice = changePrice
  window.postionMap = postionMap
  const drop = document.querySelector('#order .item.salary.selectUI .selectUI-text.text ul')
  drop.innerHTML = 工资筛选('changePrice')
  changeSort()
}