import axios from 'axios'
import DB from '../utils/DB'
import { sortBy, flatMap, unionBy } from 'lodash'
import { queryToObj, get, random } from '../utils/index'

let num = 64

let page_start = 2

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

const choseEvery = function (type, id) {
  const me = document.querySelector(`#${id}`)
  const element = me.querySelector('.item_v')
  const val = element.getAttribute('val')
  choseInit(type)
  element.classList.toggle('chose')
  if (element.classList.contains('chose')) {
    document.querySelectorAll('.masonry.masonry-demos .masonry__item').forEach(parent => {
      parent.classList.remove('none')
      const item = parent.querySelector('figcaption')
      const types = item.querySelector('p').innerText.split('\n')[1].split('：')[1].split('|').filter(s => s)
      const time = Number(item.querySelector('.type--fine-print').innerText)
      let none = false
      if (type === 'year') {
        const range = val.split('-').map(ele => Number(ele))
        none = !(time >= range[0] && time < range[1])
      }
      none && parent.classList.add('none')
    })
  }
}

const clearChose = function () {
  document.querySelectorAll('.masonry.masonry-demos .masonry__item').forEach(parent => {
    parent.classList.remove('none')
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
  let res = await axios.get(`https://www.cilixiong.com/movie/index_${i}.html`)
  return get(res, 'data', '<html></html>')
}

const addMovie = async function () {
  toggleLoading()
  try {
    let promiseList = []
    const max = page_start + num
    for (let i = page_start; i < max; i++) {
      promiseList.push(action(i))
      page_start += 1
    }
    let Htmls = await (await Promise.all(promiseList)).map(htmlProcess)
    const masonry = document.querySelector('.container .masonry-demos')
    const movesParent = masonry.querySelector('.masonry__container')
    movesParent.insertAdjacentHTML('beforeend', Htmls.join('\n'))
  } catch (error) {
  }
  toggleLoading()
}


const sleep = async function (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const insertModalContent = function () {
  let 类型 = []
  document.querySelectorAll('.masonry.masonry-demos .masonry__item figcaption').forEach(item => {
    const types = item.querySelector('p').innerText.split('\n')[1].split('：')[1].split('|').filter(s => s)
    类型.push(...types)
  })
  const modal = document.querySelector('#id-modal')
  const typeBox = modal.querySelector('.type_box')
  typeBox.innerHTML = Array.from(new Set(类型)).map(item => {
    const id = random()
    const itemHtml = `<div class="empty" onclick="choseEvery('type','${id}')" id="${id}"><div class="type_item item_v" val="${item}">${item}</div></div>`
    return itemHtml
  }).join('\n')
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
          <div class="empty" onclick="choseEvery('rate','8')" id="rate-8"><div class="rate_item item_v" val="8">8.0分以上</div></div>
          <div class="empty" onclick="choseEvery('rate','8.5')" id="rate-8.5"><div class="rate_item item_v" val="8.5">8.5分以上</div></div>
          <div class="empty" onclick="choseEvery('rate','9')" id="rate-9"><div class="rate_item item_v" val="9">9.0分以上</div></div>
          <div class="empty" onclick="choseEvery('rate','9.5')" id="rate-9.5"><div class="rate_item item_v" val="9.5">9..5分以上</div></div>
        </div>
        <div class="type_box row"></div>
        <div class="row clear_btn" onclick="clearChose()">清空条件</div>
      </div>
    </div>
  `)
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