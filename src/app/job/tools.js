import Config from '../../assets/custom'
import { set, sumBy, sortBy, cloneDeep } from 'lodash'
import { get, pointDistance, jsonParse } from "../../utils"

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
  for (let key of Object.keys(filterDict)) {
    const [x1, x2] = filterDict[key]
    const value = appdata[key]
    if ([x1, x2].every(i => i == 0)) {
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
export const filterItem = function (list = [], filterDict_ = {}) {
  const filterDict = cloneDeep(filterDict_)
  delete filterDict.综合值
  for (let item of list) {
    const appdata = jsonParse(item.getAttribute('appdata'))
    if (addNone(appdata, filterDict)) {
      item.classList.add('none')
    } else {
      item.classList.remove('none')
    }
  }
}