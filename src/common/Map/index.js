import './index.scss'
import Html from './index.html'
import BaseMap from './baseMap'
import { throttle, set } from 'lodash'
import { get, strFormat, random, datasetFind, dataset } from '../../utils'

class Map {
  constructor(selector) {
    this.id = random()
    this.mapId = random()
    this.Gmap = new BaseMap(selector, this.id, this.mapId)
    this.selector = selector
    this.DB = dataset('/path/Gmap.db')
    this.element = { btns: [], tabs: [] }
  }

  static async new (selector) {
    const map = new this(selector)
    await map.init()
    return map
  }

  searchKeyword (key) {
    return this.Gmap.searchKeyword(key)
  }

  async getMapData (point, targetPoint) {
    window.keep = false
    const routeId = [...point, ...targetPoint].map(p => (p + '').replace('.', '')).join('')
    const data = await datasetFind(this.DB, { routeId })
    if (data != null) {
      const result = { ...get(data, 'content', {}) }
      window.keep = true
      if (Object.keys(result).length === 0) {
        return true
      }
      set(result, 'keep', true)
      return result
    } else {
      window.keep = false
      let content = await this.Gmap.transfer(point, targetPoint, 'api')
      if (content == null) {
        await this.DB.insert({ routeId })
        return
      }
      const result = { content: { res: content.res, result: {} }, routeId }
      await this.DB.insert(result)
      return content
    }
  }

  /**
   * 批量计算目标配置中的地点到当前地点的公交路线
   *
   * @param {*} targetPoint
   * @returns
   * @memberof Map
   */
  async transfersPoint (targetPoint) {
    let promiseList = []
    const homeDict = this.Gmap.config.homeDict
    for (let key of Object.keys(homeDict)) {
      const point = homeDict[key]
      const fun = this.getMapData(point, targetPoint)
      promiseList.push(fun)
    }
    const result = await Promise.all(promiseList)
    return result.filter(item => item != null)
  }

  changeMapSrc (point) {
    this.Gmap.transfer(point)
  }

  goPoint (经度, 纬度, name) {
    const point = [经度, 纬度]
    this.Gmap.panTo(point, name)
    const btn = this.element.btns[0]
    const tab = this.element.tabs[0]
    btn.click()
    tab.click()
  }

  homeBtnClickCallback (point, type) {
    if (type === 'bus') {
      this.Gmap.transfer(point, this.Gmap.当前坐标)
    } else if (type === 'drive') {
      this.Gmap.driving(point, this.Gmap.当前坐标)
    }
  }

  transferTabChange (target) {
    console.log('切换tab', target)
    const btn = this.element.btns.find(b => b.getAttribute('type') === 'p')
    btn.click()
  }

  init () {
    const eventConfig = {
      init: (element) => this.element = element,
      transferTabChange: this.transferTabChange.bind(this),
      homeBtnClickCallback: this.homeBtnClickCallback.bind(this),
    }
    this.Gmap.init(eventConfig)
  }
}

export default Map