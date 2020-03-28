import './index.scss'
import Html from './index.html'
import { throttle } from 'lodash'
import Config from '../../assets/custom'
import { createScriptFormRemote, random, get, strFormat } from '../../utils'

class Map {
  constructor() {
    this.config = Config()
    this.id = random()
    this.mapId = random()
    const url = `//webapi.amap.com/maps?v=1.4.15&key=${this.config.高德地图key}&plugin=AMap.Transfer`
    createScriptFormRemote({ map: url })
    document.head.insertAdjacentHTML('beforeend', '<meta name="viewport" content="initial-scale=1.0, user-scalable=no"> ')
    this.浏览器定位信息 = {}
    this.autocomplete = null
    this.map = null
    window.searchInput = this.searchInput.bind(this)
    window.throttle = throttle
    this.targetPoint = { name: '未知' }
  }

  addMark (point, name) {
    const marker = new AMap.Marker({
      position: new AMap.LngLat(...point),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: name
    })
    this.map.add(marker)
  }

  transfer (point) {
    const transOptions = {
      map: this.map,
      city: '广州市',
      panel: 'lu-result',
      nightflag: true,
      policy: AMap.TransferPolicy.LEAST_TIME,
      autoFitView: true
    };
    //构造公交换乘类
    const transfer = new AMap.Transfer(transOptions);
    //根据起、终点坐标查询公交换乘路线
    transfer.search(new AMap.LngLat(...point), new AMap.LngLat(...this.targetPoint.location), function (status, result) {
      // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
      if (status === 'complete') {
        console.log('绘制公交路线完成', result.plans.map(pObj => {
          const result = { paths: pObj.segments.map(s => ({ time: s.time, text: s.instruction })), cost: pObj.cost, time: pObj.time }
          return result
        }))
      } else {
        console.log('公交路线数据查询失败', result)
      }
    })
  }

  changeMapSrc (point) {
    const trBox = document.querySelector('.result-box')
    trBox.classList.remove('none')
    trBox.querySelector('#lu-result').innerHTML = ''
    this.transfer(point)
  }

  goPoint (经度, 纬度, name) {
    const point = [经度, 纬度]
    this.map.panTo(point)
    this.targetPoint.location = point
    if (name != null) {
      this.targetPoint.name = name
      this.addMark(point, name)
    }
    this.changeMapSrc()
  }

  onComplete (positionInfo) {
    this.浏览器定位信息 = {
      allInfo: positionInfo,
      address: get(positionInfo, 'formattedAddress'),
      position: get(positionInfo, 'position', {}),
      经度: get(positionInfo, 'position.lng', 0),
      纬度: get(positionInfo, 'position.lat', 0),
    }
    console.log('定位信息', this.浏览器定位信息)
  }

  onError (...args) {
    console.log('定位报错信息', ...args)
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

  insertSearch () {
    this.map.plugin('AMap.Autocomplete', () => {
      const autoOptions = { city: '全国' }
      this.autocomplete = new AMap.Autocomplete(autoOptions)
    })
  }

  chooseOption (keyword) {
    const code = keyword.split('||')[1]
    const datalistDom = document.querySelector('#search-list')
    const datalist = JSON.parse(datalistDom.getAttribute('data'))
    if (datalist instanceof Array) {
      const target = datalist.find(d => d.adcode === code)
      const location = get(target, 'location', [])
      const point = [location.lng, location.lat]
      this.map.panTo(point)
      this.addMark(point, get(target, 'name', '不知道'))
    }
  }

  /**
   * 查询关键字
   *
   * @param {*} keyword
   * @returns
   * @memberof Map
   */
  search (keyword) {
    if (keyword.includes('||')) {
      this.chooseOption(keyword)
    } else {
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
      })
    }

  }


  searchInput (event) {
    const target = event.target
    const val = get(target, 'value', null)
    if (val === '' || val == null) {
      return
    } else {
      this.search(val)
    }
  }

  addHome () {
    let btnList = Object.keys(this.config.homeDict || {}).map(key => {
      const point = this.config.homeDict[key]
      const btnHtml = `<button class="_btn home-btn" type="b" name="${key}" point="${JSON.stringify(point)}">${key}路线</button>`
      return btnHtml
    })
    const html = `
    <div class="home-btn-box">
      ${btnList.join('\n')}
    </div>
    `
    return html
  }

  addListener () {
    const searchBox = document.querySelector('#search-input')
    const trTabBox = document.querySelector('.tr-btn-box')
    const fun = throttle(this.searchInput.bind(this), 500)
    searchBox.addEventListener('input', fun)
    searchBox.addEventListener('focus', () => searchBox.value = '')
    const homeBox = document.querySelector('.home-btn-box')
    homeBox.addEventListener('click', event => {
      const target = event.target
      const point = JSON.parse(target.getAttribute('point'))
      this.changeMapSrc(point)
    })
    trTabBox.addEventListener('click', event => {
      const target = event.target
      const type = target.getAttribute('type')
      trTabBox.querySelectorAll('.tr-tab').forEach(tab => tab.setAttribute('active', ''))
      target.setAttribute('active', 'active')
    })
  }


  init (selector) {
    return new Promise((resolve, reject) => {
      window.onload = () => {
        const html = strFormat(Html['gaode-map'], {
          id: this.id,
          mapId: this.mapId,
          searchHtml: Html['search-box'],
          addHome: this.addHome()
        })
        const parent = document.querySelector(selector)
        parent.insertAdjacentHTML('beforeend', html)
        this.map = new AMap.Map(this.mapId, { resizeEnable: true, zoom: 10 })
        this.postionSelf()
        this.insertSearch()
        this.addListener()
        resolve()
      }
    })
  }
}

export default Map