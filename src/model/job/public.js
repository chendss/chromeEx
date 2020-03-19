import Config from '../../assets/custom'
import '../../styles/job/public.scss'
import { createScriptFormRemote, random } from '../../utils'

class Map {
  constructor() {
    this.config = Config()
    this.id = random()
    const url = `//webapi.amap.com/maps?v=1.4.15&key=${this.config.高德地图key}`
    createScriptFormRemote({ map: url })
    document.head.insertAdjacentHTML('beforeend', '<meta name="viewport" content="initial-scale=1.0, user-scalable=no"> ')
  }

  onComplete (...args) {
    console.log('定位信息', ...args)
  }

  onError (...args) {
    console.log('定位信息', ...args)
  }

  postionSelf () {
    this.map.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        showButton: true,        //显示定位按钮，默认：true
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      })
      this.map.addControl(geolocation)
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', this.onComplete)//返回定位信息
      AMap.event.addListener(geolocation, 'error', this.onError)      //返回定位出错信息
    })
  }

  init (selector) {
    return new Promise((resolve, reject) => {
      window.onload = () => {
        const html = `<div id=${this.id} class="modal gaode-map"></div> `
        const parent = document.querySelector(selector)
        parent.insertAdjacentHTML('beforeend', html)
        this.map = new AMap.Map(this.id)
        this.postionSelf()
        resolve()
      }
    })
  }
}

export default Map