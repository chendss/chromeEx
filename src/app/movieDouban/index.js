import axios from 'axios'
import DB from '@/utils/DB'
import { sortBy, unionBy } from 'lodash'
import { queryToObj, get } from '@/utils/index'

const queryObj = queryToObj()
queryObj.tag = decodeURIComponent(queryObj.tag)
let page_start = Number(queryObj.page_start)
let num = 10
let limit = 20 * 20
let type = queryObj['https://movie.douban.com/explore#!type']
let loading = false
let GD = { moves: [] }
let middle = []

const modal = function (info) {
  return `
  <a class="item" target="_blank" href="${info.url}/?tag=${queryObj.tag}&amp;from=gaia_video" id="move_${info.id} rate="${info.rate}"">
      <div class="cover-wp" data-isnew="false" data-id="${info.id}">
          <img src="${info.cover}" alt="${info.title}" data-x="2033" data-y="3000">
      </div>
      <p>
          ${info.title}
          <strong>${info.rate}</strong>
      </p>
  </a>`
}

const toggleLoading = function () {
  const loadingDom = document.querySelector('#loading')
  if (loadingDom) {
    loadingDom.classList.toggle('none')
  }
}

const setMoves = function (list) {
  const parent = document.querySelector('#content .list-wp .list')
  const htmls = list.map(item => modal(item))
  parent.innerHTML = htmls.join('\n')
  GD.moves = list
}

const flatMap = (arrList) => {
  const result = []
  for (let i = 0; i < arrList.length; i++) {
    const arr = arrList[i]
    for (let j = 0; j < arr.length; j++) {
      result.push(arr[j])
    }
  }
  return result
}

const getDetail = (id) => {
  // https://movie.douban.com/j/subject_abstract?subject_id=30140054
}

const action = async function (index, limit_) {
  const params = {
    tag: queryObj.tag,
    sort: 'time',
    page_limit: (limit_ || limit) + '',
    page_start: page_start + index * limit,
    type,
  }
  let res = await axios.get('https://movie.douban.com/j/search_subjects', { params })
  return get(res, 'data.subjects', [])
}

const addMove = async function () {
  loading = true
  toggleLoading()
  try {
    let promiseList = []
    for (let i = 0; i < num; i++) {
      promiseList.push(action(i))
    }
    let result = await Promise.all(promiseList)
    middle = flatMap(result).filter(item => Number(item.rate) > 8)
  } catch (error) {
  }
  toggleLoading()
  loading = false
}

const sortMove = function () {
  setInterval(() => {
    if (decodeURIComponent(queryToObj()['tag']) !== queryObj['tag']) {
      window.location.reload()
    } else if (loading !== true && middle.length !== 0) {
      let list = [...GD.moves]
      list.push(...middle)
      middle = []
      // let sortList = sortBy(list, 'rate').reverse()
      setMoves(list)
    }
  }, 300)
}

const sleep = async function (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

var main = async function () {
  document.body.insertAdjacentHTML('beforeend', `  <div class="none" id="cy_loading"><div class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div>`)
  toggleLoading()
  await waitInit()
  await sleep(500)
  toggleLoading()
  const listDom = document.querySelector('#content .list-wp .list')
  listDom.innerHTML = ''
  const more = document.querySelector('#content .gaia .more')
  const parent = more.parentElement
  parent.insertAdjacentHTML('beforeend', `<div class="custom_more">加载更多</div>`)
  const readMore = parent.querySelector('.custom_more')
  readMore.addEventListener('click', () => {
    addMove()
  })
  addMove()
  sortMove()
}

const waitInit = async function () {
  return new Promise((resolve) => {
    const k = setInterval(() => {
      const listDom = document.querySelectorAll('#content .list-wp .list .item')
      if (listDom.length !== 0) {
        clearInterval(k)
        resolve()
      }
    }, 200)
  })
}

export default main