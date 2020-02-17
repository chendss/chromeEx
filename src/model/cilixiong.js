import axios from 'axios'
import DB from '../utils/DB'
import { sortBy, flatMap, unionBy } from 'lodash'
import { queryToObj, get } from '../utils/index'

let num = 64

let page_start = 2

const toggleLoading = function () {
  document.querySelector('#loading').classList.toggle('none')
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

const addSearch = function () {
  document.querySelector('#search_btn').addEventListener('click', () => {
    const modal = document.querySelector('#id-modal')
    modal.classList.remove('none')
  })
}

const markEvent = function () {
  document.querySelector('#id-modal .mark').addEventListener('click', () => {
    const modal = document.querySelector('#id-modal')
    modal.classList.add('none')
    modal.querySelector('.modal-content').innerHTML = ''
    document.body.classList.remove('hidde')
  })
}

const insertHtml = function () {
  document.body.insertAdjacentHTML('beforeend', `  <div class="none" id="loading"><div class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div>`)
  document.body.insertAdjacentHTML('beforeend', `
    <div id="search_btn">筛选</div>
    <div id="id-modal" class="none">
      <div class="mark"></div>
      <div class="modal-content">
      </div>
    </div>
  `)
}

const main = async function () {
  insertHtml()
  addSearch()
  markEvent()
  const more = document.querySelector('.main-container .imagebg .container .row .tsc_pagination')
  const parent = more.parentElement
  parent.insertAdjacentHTML('beforeend', `<div class="custom_more">加载更多</div>`)
  const readMore = parent.querySelector('.custom_more')
  readMore.addEventListener('click', () => {
    addMovie()
  })
}

export default main