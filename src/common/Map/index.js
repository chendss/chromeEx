import './index.scss'
import Html from './index.html'
import BaseMap from './baseMap'
import { throttle } from 'lodash'
import { get, strFormat, random } from '../../utils'

class Map {
  constructor(selector) {
    this.id = random()
    this.mapId = random()
    this.Gmap = new BaseMap(selector, this.id, this.mapId)
    this.selector = selector
    this.element = { btns: [], tabs: [] }
  }

  changeMapSrc (point) {
    this.Gmap.transfer(point)
  }

  goPoint (经度, 纬度, name) {
    const point = [经度, 纬度]
    this.Gmap.panTo(point, name)
    console.log('oooo', this.element)
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
  }

  init () {
    const eventConfig = {
      homeBtnClickCallback: this.homeBtnClickCallback.bind(this),
      transferTabChange: this.transferTabChange.bind(this),
      init: (element) => {
        console.log('ppp?>??', element, this)
        this.element = element
      }
    }
    this.Gmap.init(eventConfig)
  }
}

export default Map