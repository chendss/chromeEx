import DB from '@/utils/DB'
import Config from '../../assets/custom'
import { set, sumBy, sortBy, cloneDeep } from 'lodash'
import { get, pointDistance, jsonParse } from "../../utils"
import { es, q } from '@/utils/tools'

/**
* transferInfo html代码生成
* @param {*} transferList
*
*/
export const transferInfoHtml = function (transferList) {
  const homeDict = Config().homeDict
  const homeList = Object.keys(homeDict).reduce((pre, key) => {
    const value = homeDict[key]
    pre.push({ key, value })
    return pre
  }, [])
  const result = []
  for (let i = 0; i < transferList.length; i++) {
    const trs = transferList[i]
    const itemHtml = trs.map(tr => {
      return `
          <div class="tr-info-item" datavalue="${JSON.stringify(tr)}">
            <label>${tr.text}：</label>
            <div class="tr-content">${tr.value}</div>
          </div>
        `
    })
    result.push(`<div class="tr-info">
      <div class="tr-title">${homeList[i].key}</div>
     ${itemHtml.join('\n')}
     </div>`)
  }
  return result.join('\n')
}

/**
* 路线数据处理函数
*
* @param {*} item
* @param {*} map
*/
export const transferDataProcess = async function (item, map) {
  let result = { ...item }
  const { longitude, latitude } = item
  let routes = await map.transfersPoint([longitude, latitude])
  let transferList = []
  for (let res of routes.map(r => r.res)) {
    const sortData = sortBy(res, 'time').map(t => {
      const result = { ...t }
      result.busList = get(t, 'paths', []).filter(p => p.type !== 'WALK')
      return result
    })
    const length = Math.max(1, get(sortData, 'length', 0))
    const averageTime = Math.floor(((sumBy(sortData, 'time') / length)) / 60)
    const averageCost = sumBy(sortData, 'cost') / length
    const transferToNum = sumBy(sortData, d => d.busList.length) / length
    const minTime = get(sortData, '[0].time', 0)
    const maxTime = get(sortData, `[${length - 1}].time`, 0)
    transferList.push([
      {
        text: '平均时间',
        value: averageTime + '分钟'
      },
      {
        text: '平均价格',
        value: averageCost.toFixed(2)
      },
      {
        text: '换乘次数',
        value: transferToNum.toFixed(2)
      },
      {
        text: '最短时间',
        value: Math.floor(minTime / 60) + '分钟'
      },
      {
        text: '最长时间',
        value: Math.floor(maxTime / 60) + '分钟'
      },
    ])
  }
  const transferListHtml = transferInfoHtml(transferList)
  set(result, 'transferListHtml', transferListHtml)
  set(result, 'transferList', transferList)
  return result
}

/**
 * 指标排序
 *
 * @param {*} type
 * @param {*} appData
 * @returns
 */
const indicatorsSort = function (type, appData) {
  let result = 0
  const dict = {
    price: '工资',
    time: '通勤时间',
    number: '换乘次数'
  }
  for (let key of Object.keys(dict)) {
    const value = dict[key]
    if (type === value) {
      return appData[key]
    }
  }
  return result
}

/**
 * 综合排序
 *
 * @param {*} perfect
 * @param {*} appData
 * @returns
 */
const comprehensiveSort = function (comprehensive, perfect, appData) {
  const point = perfect.split(',').map(i => Number(i))
  if (comprehensive === '工资') {
    point[0] += 3000
  } else if (comprehensive === '通勤时间') {
    point[1] -= 15
  } else if (comprehensive === '换乘') {
    point[2] -= 1
  }
  const result = -1 * pointDistance(point, appData.综合值)
  return result
}


export const sortItem = function (sortDict, perfect, appData) {
  const type = get(sortDict, 'type', null)
  const sortType = sortDict.sortType === -1 ? 1 : -1
  const comprehensive = get(sortDict, 'comprehensive', null)
  let value = 0
  if (['工资', '通勤时间', '换乘次数'].includes(type)) {
    value = indicatorsSort(type, appData)
  } else if (['综合', '工资', '换乘', 'point'].includes(comprehensive)) {
    value = comprehensiveSort(comprehensive, perfect, appData)
  }
  return sortType * value
}

const addNone = function (appdata, filterDict) {
  if (appdata == null) return true
  for (let key of Object.keys(filterDict)) {
    const [x1, x2] = filterDict[key]
    const value = get(appdata, key, null)
    if (value == null || [x1, x2].every(i => i == 0)) {
      continue
    } else if (value < x1 || value > x2) {
      return true
    }
  }
  return false
}

/**
* 过滤item
*
* @param {*} [list=[]]
* @param {*} [filterDict=[]]
*/
export const filterItem = function (list = [], filterDict_ = {}, appdata_ = null) {
  const filterDict = cloneDeep(filterDict_)
  delete filterDict.综合值
  for (let item of list) {
    const appdata = appdata_ || jsonParse(item.getAttribute('appdata'))
    if (addNone(appdata, filterDict)) {
      item.classList.add('none')
    } else {
      item.classList.remove('none')
    }
  }
}

export const waitWindowClose = function (win) {
  return new Promise((resolve) => {
    const k = setInterval(() => {
      if (win.closed === true) {
        resolve()
        clearInterval(k)
      }
    }, 300)
  })
}

export const getItemDataValue = function (priceList, item, key) {
  const transferList = item.transferList
  const index = get(DB.get(key), 'index', 0)
  const transfer = get(transferList, index, null)
  if (transfer == null) {
    return JSON.stringify(null)
  }
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

export const onConfirmAction = function (data, list, ul) {
  const sortDict = get(data, 'sort', {})
  const filterDict = get(data, 'filter', {})
  const perfect = q('._search_filter_box.cy_panel').querySelector('.content_row.least_box .cy_input').value
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
    ul.appendChild(item)
  })
}