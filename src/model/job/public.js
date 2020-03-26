import { throttle } from 'lodash'
import '../../styles/job/public.scss'
import Config from '../../assets/custom'
import { createScriptFormRemote, random, get } from '../../utils'

class Map {
  constructor() {
    this.config = Config()
    this.id = random()
    this.mapId = random()
    const url = `//webapi.amap.com/maps?v=1.4.15&key=${this.config.高德地图key}`
    createScriptFormRemote({ map: url })
    document.head.insertAdjacentHTML('beforeend', '<meta name="viewport" content="initial-scale=1.0, user-scalable=no"> ')
    this.浏览器定位信息 = {}
    this.autocomplete = null
    this.map = null
    window.searchInput = this.searchInput.bind(this)
    window.throttle = throttle
  }


  onComplete(positionInfo) {
    this.浏览器定位信息 = {
      allInfo: positionInfo,
      address: get(positionInfo, 'formattedAddress'),
      position: get(positionInfo, 'position', {}),
      经度: get(positionInfo, 'position.lng', 0),
      纬度: get(positionInfo, 'position.lat', 0),
    }
    console.log('定位信息', this.浏览器定位信息)
  }

  onError(...args) {
    console.log('定位报错信息', ...args)
  }

  postionSelf() {
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

  insertSearch() {
    this.map.plugin('AMap.Autocomplete', () => {
      const autoOptions = { city: '全国' }
      this.autocomplete = new AMap.Autocomplete(autoOptions)
    })
  }

  chooseOption(event) {
    const code = get(event, 'target.value', '').split('||')[1]
    const datalistDom = document.querySelector('#search-list')
    const datalist = JSON.parse(datalistDom.getAttribute('data'))
    const target = datalist.find(d => d.adcode === code)
    const location = get(target, 'location', [])
    const point = [location.lng, location.lat]
    this.map.panTo(point)
  }

  /**
   * 查询关键字
   *
   * @param {*} keyword
   * @returns
   * @memberof Map
   */
  search(keyword) {
    return new Promise((resolve) => {
      this.autocomplete.search(keyword, (status, result) => {
        console.log('搜索结果', status, result)
        if (status === 'complete') {
          const id = '#search-list'
          const titps = get(result, 'tips', [])
          const list = titps.map(item => {
            const strList = [item.name, item.district, item.address]
            const value = strList.join('-') + `||${item.adcode}`
            const location = JSON.stringify(item.location)
            const result = `<option title="${value}" value="${value}" adcode="${item.adcode}" location="${location}"/>`
            return result
          })
          const dom = document.querySelector(id)
          dom.innerHTML = list.join('\n')
          dom.setAttribute('data', JSON.stringify(titps))
        }
        resolve({ status, result })
      })
    })
  }


  searchInput(event) {
    const target = event.target
    const val = get(target, 'value', null)
    if (val === '' || val == null) {
      return
    } else {
      this.search(val)
    }
  }

  searchHtml() {
    const html = `
    <div class="search-box">
      <input class="ui-input" id="search-input" list="search-list" oninput="throttle((event)=>searchInput(event),300)(event)">
      <datalist id="search-list">
      </datalist>
    </div>
   `
    return html
  }

  addListener() {
    const searchBox = document.querySelector('#search-input')
    const fun = throttle(this.searchInput.bind(this), 300)
    searchBox.addEventListener('input', fun)
    searchBox.addEventListener('blur', this.chooseOption.bind(this))
  }


  init(selector) {
    return new Promise((resolve, reject) => {
      window.onload = () => {
        const html = `
          <div class="_modal gaode-map" id="${this.id}">
            <div id="${this.mapId}" class="map-content"></div>
            ${this.searchHtml()}
          </div> 
        `
        const parent = document.querySelector(selector)
        parent.insertAdjacentHTML('beforeend', html)
        this.map = new AMap.Map(this.mapId, { resizeEnable: true })
        this.postionSelf()
        this.insertSearch()
        this.addListener()
        resolve()
      }
    })
  }
}

export default Map