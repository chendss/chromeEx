import { get } from "../../utils"
import Config from '../../assets/custom'
import { set, sumBy, sortBy } from 'lodash'

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
          <div class="tr-info-item">
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
    const sortData = sortBy(res, 'time')
    const length = get(sortData, 'length', 1)
    const averageTime = Math.floor(((sumBy(sortData, 'time') / length)) / 60)
    const averageCost = sumBy(sortData, 'cost') / length
    const transferToNum = sumBy(sortData, d => d.paths.length) / length
    const minTime = sortData[0].time
    const maxTime = sortData[length - 1].time
    transferList.push([
      {
        text: '平均时间',
        value: averageTime + '分钟'
      },
      {
        text: '平均价格',
        value: averageCost
      },
      {
        text: '换乘次数',
        value: transferToNum
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
    const transferListHtml = transferInfoHtml(transferList)
    set(result, 'transferListHtml', transferListHtml)
    return result
  }
}
