import axios from 'axios'
import $ from 'jquery'
import DB from '../utils/DB'
import Nedb from 'nedb'
import { sortBy, flatMap, unionBy } from 'lodash'
import { queryToObj, get, random } from '../utils/index'

const dataset = new Nedb({
  filename: '/data/cli.db',
  autoload: true
})

let num = 64

let page_start = 2

let render = true

const datasetFind = function (href) {
  return new Promise((resolve) => {
    dataset.findOne({ id: href }, (err, docs) => {
      resolve(docs)
    })
  })
}

const toggleLoading = function () {
  document.querySelector('#loading').classList.toggle('none')
}

const choseInit = function (type) {
  const dict = {
    rate: 'rate_item',
    year: 'year_item',
    type: 'type_item',
  }
  if (type == null) {
    Object.keys(dict).forEach(key => {
      document.querySelectorAll(`.${dict[key]}`).forEach(item => item.classList.remove('chose'))
    })
  } else {
    document.querySelectorAll(`.${dict[type]}`).forEach(item => item.classList.remove('chose'))
  }
}

const 拦截a点击 = function () {
  document.querySelectorAll('.masonry.masonry-demos .masonry__item').forEach(async parent => {
    if (parent.getAttribute('url') == null) {
      const a = parent.querySelector('.text-block')
      const href = a.href
      a.href = 'javascript:void(0);'
      a.target = ''
      parent.setAttribute('url', href)
      parent.setAttribute('showtype', 'normal')
      const content = await datasetFind(href)
      if (content == null) {
        let res = await axios.get(href)
        let data = get(res, 'data', '<html></html>')
        const p = new DOMParser()
        const Html = p.parseFromString(data, "text/html")
        const card = Html.querySelector('.col-md-4 .summary-card .information-text').innerHTML
        dataset.insert({ id: href, content: card, normal: parent.innerHTML })
      }
      parent.addEventListener('click', async () => {
        let hr = parent.getAttribute('url')
        const dict_ = await datasetFind(hr)
        if (parent.getAttribute('showtype') === 'normal') {
          parent.innerHTML = `<div class="info_content">${dict_['content']}</div>`
          parent.setAttribute('showtype', 'card')
          parent.setAttribute('large', 'true')
        } else {
          parent.innerHTML = dict_['normal']
          parent.setAttribute('showtype', 'normal')
          parent.setAttribute('large', 'false')
        }
      })
    }
  })
}

const choseEvery = function (type, id) {
  const me = document.querySelector(`#${id}`)
  const element = me.querySelector('.item_v')
  const val = element.getAttribute('val')
  choseInit(type)
  element.classList.toggle('chose')
  if (element.classList.contains('chose')) {
    console.time('t1')
    const copyDom = document.querySelector('.container .masonry.masonry-demos')
    copyDom.querySelectorAll('.masonry__item').forEach(parent => {
      const item = parent.querySelector('figcaption')
      const text = item.querySelector('p').innerText
      const typeStr = text.split('类型：')[1]
      const typeStr_ = typeStr.split('片长：')[0]
      const types = typeStr_.split('|').filter(s => s)
      const time = Number(item.querySelector('.type--fine-print').innerText)
      const rate = Number(item.querySelector('em').innerText)
      if (type === 'year') {
        const range = val.split('-').map(ele => Number(ele))
        let none = time >= range[0] && time < range[1]
        parent.setAttribute('yearstatus', none + '')
      } else if (type === 'rate') {
        let none = rate >= Number(val)
        parent.setAttribute('ratestatus', none + '')
      } else if (type === 'type') {
        let none = types.includes(val)
        parent.setAttribute('typestatus', none + '')
      }
    })
    console.timeEnd('t1')
  }
}

const clearChose = function () {
  document.querySelectorAll('.masonry.masonry-demos .masonry__item').forEach(parent => {
    parent.removeAttribute('yearstatus')
    parent.removeAttribute('ratestatus')
    parent.removeAttribute('typestatus')
  })
  choseInit()
}

const htmlProcess = function (data) {
  const p = new DOMParser()
  const Html = p.parseFromString(data, "text/html")
  const masonry = Html.querySelector('.container .masonry-demos')
  const movesParent = masonry.querySelector('.masonry__container')
  return movesParent.innerHTML
}

const action = async function (i) {
  return new Promise((resolve) => {
    axios.get(`https://www.cilixiong.com/movie/index_${i}.html`).then(res => {
      resolve(get(res, 'data', '<html></html>'))
    }).catch(err => {
      resolve('<html></html>')
    })
  })
}

const addMovie = async function () {
  toggleLoading()
  render = true
  try {
    let promiseList = []
    const max = page_start + num
    for (let i = page_start; i < max; i++) {
      promiseList.push(action(i))
      page_start += 1
    }
    let list = await Promise.all(promiseList)
    let Htmls = list.map(htmlProcess)
    const masonry = document.querySelector('.container .masonry-demos')
    const movesParent = masonry.querySelector('.masonry__container')
    movesParent.insertAdjacentHTML('beforeend', Htmls.join('\n'))
  } catch (error) {
  }
  toggleLoading()
  拦截a点击()
}


const sleep = async function (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const insertModalContent = function () {
  if (render === false) return
  let 类型 = []
  document.querySelectorAll('.masonry.masonry-demos .masonry__item figcaption').forEach(item => {
    const strList = item.querySelector('p').outerHTML.split('类型：')
    const typesStr = strList[1].split('<br')[0]
    const types = typesStr.split('|').filter(s => s)
    类型.push(...types)
  })
  const modal = document.querySelector('#id-modal')
  const typeBox = modal.querySelector('.type_box')
  typeBox.innerHTML = Array.from(new Set(类型)).map(item => {
    const id = random()
    const itemHtml = `<div class="empty" onclick="choseEvery('type','${id}')" id="${id}"><div class="type_item item_v" val="${item}">${item}</div></div>`
    return itemHtml
  }).join('\n')
  render = false
}

const addSearch = function () {
  document.querySelector('#search_btn').addEventListener('click', () => {
    const modal = document.querySelector('#id-modal')
    insertModalContent()
    modal.classList.remove('none')
    document.body.classList.add('hidde')
  })
}

const closeMask = function () {
  const modal = document.querySelector('#id-modal')
  modal.classList.add('none')
  document.body.classList.remove('hidde')
}


const insertHtml = function () {
  document.body.insertAdjacentHTML('beforeend', `  <div class="none" id="loading"><div class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div>`)
  document.body.insertAdjacentHTML('beforeend', `
    <div id="search_btn">筛选</div>
    <div id="id-modal" class="none">
      <div class="mark"></div>
      <div class="modal-content">
        <div class="year_box row">
          <div class="empty" onclick="choseEvery('year','a0-1950')" id="a0-1950"><div class="year_item item_v" val="0-1950">1950年以下</div></div>
          <div class="empty" onclick="choseEvery('year','a1950-1980')" id="a1950-1980"><div class="year_item item_v" val="1950-1980">1950-1980年</div></div>
          <div class="empty" onclick="choseEvery('year','a1980-2000')" id="a1980-2000"><div class="year_item item_v" val="1980-2000">1980-2000年</div></div>
          <div class="empty" onclick="choseEvery('year','a2000-2010')" id="a2000-2010"><div class="year_item item_v" val="2000-2010">2000-2010年</div></div>
          <div class="empty" onclick="choseEvery('year','a2010-2015')" id="a2010-2015"><div class="year_item item_v" val="2010-2015">2010-2015年</div></div>
          <div class="empty" onclick="choseEvery('year','a2015-2020')" id="a2015-2020"><div class="year_item item_v" val="2015-2020">2015-2020年</div></div>
          <div class="empty" onclick="choseEvery('year','a2020-0')" id="a2020-0"><div class="year_item item_v" val="2020-3000">2020年以上</div></div>
          </div>
        <div class="rate_box row">
          <div class="empty" onclick="choseEvery('rate','rate-8')" id="rate-8"><div class="rate_item item_v" val="8">8.0分以上</div></div>
          <div class="empty" onclick="choseEvery('rate','rate-8_5')" id="rate-8_5"><div class="rate_item item_v" val="8.5">8.5分以上</div></div>
          <div class="empty" onclick="choseEvery('rate','rate-9')" id="rate-9"><div class="rate_item item_v" val="9">9.0分以上</div></div>
          <div class="empty" onclick="choseEvery('rate','rate-9_5')" id="rate-9_5"><div class="rate_item item_v" val="9.5">9..5分以上</div></div>
        </div>
        <div class="type_box row"></div>
        <div class="row clear_btn" onclick="clearChose()">清空条件</div>
      </div>
    </div>
  `)
  拦截a点击()
}

const main = async function () {
  insertHtml()
  addSearch()
  document.querySelector('#id-modal .mark').addEventListener('click', closeMask)
  const more = document.querySelector('.main-container .imagebg .container .row .tsc_pagination')
  const parent = more.parentElement
  parent.insertAdjacentHTML('beforeend', `<div class="custom_more">加载更多</div>`)
  const readMore = parent.querySelector('.custom_more')
  readMore.addEventListener('click', () => {
    addMovie()
  })
  window.choseEvery = choseEvery
  window.clearChose = clearChose
}

export default main