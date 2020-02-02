import axios from "axios"
import Clipdboard from 'clipboard'
import DB from "../utils/DB"
import { random } from '../utils/index'
import '../utils/spop.min.js'
import { get, toNumber } from "lodash"

const dxNumber = toNumber(get(DB.get("av"), "number", "8"))

const copyStr = function (dom) {
  const textarea = dom.querySelector('.info-textarea')
  const str = textarea.innerHTML
  const input = document.createElement('textarea')
  document.body.appendChild(input)
  input.innerHTML = str
  input.select()
  document.execCommand('copy')
  setTimeout(() => {
    input.remove()
  }, 2000)
  spop({
    template: '成功',
    position: 'bottom-right',
    style: 'success',
    autoclose: 2000
  })
}

const pageStart = function () {
  const href = location.href
  let n = "0"
  if (href.includes("page")) {
    n = href.split('/')[href.split('/').length - 1]
  } else {
    n = 1
  }
  return parseFloat(n)
}

let pageIndex = pageStart()

const insterModal = function () {
  document.body.classList.add('hidde')
  const modal = document.querySelector('#id-modal')
  modal.classList.remove('none')
}

const queryBtnClick = async function (id) {
  openLoading()
  try {
    const parent = document.querySelector(`#${id}`)
    const a = parent.querySelector('.entry-title a')
    const url = a.href
    const result = await axios.get(url)
    const data = result.data
    const p = new DOMParser()
    const Html = p.parseFromString(data, "text/html")
    const downDomList = [...Html.querySelectorAll('#zdownload .download-link')]
    const btxtList = [...Html.querySelectorAll('#btxt>a')]
    const links = [...btxtList, ...downDomList].map(d => ({ href: d.href, name: d.outerText }))
    const modalContent = document.querySelector('#id-modal .modal-content')
    const htmlList = links.map(l => {
      const id = random()
      const model = `
        <div class="info-li" id="${id}">
          <div class="title">${l.name}</div>
          <div class="info-textarea">${l.href}</div>
        </div>
      `
      return model
    })
    modalContent.insertAdjacentHTML('beforeend', htmlList.join('\n'))
    modalContent.querySelectorAll('.info-li').forEach(l => l.addEventListener('click', () => copyStr(l)))
    console.log('连接地址', links)
    insterModal()
  } catch (error) {
    console.log('查看报错', error)
  }
  closeLoading()
}

const score = function (titleDom) {
  let infos = titleDom.title.split(']')
  if (infos.length <= 1) {
    infos = titleDom.title.split('/')
  }
  const texts = infos.map(item => item.replace('[', ''))
  const text = texts.find(t => t.includes('豆瓣')) || '0'
  const n = text.replace('豆瓣', '').replace('分', '')
  console.log('片子', texts[0], '分数为', n)
  return { status: Number(n) > 7.2, name: texts[0].split(' ')[0] }
}

const checkAllItems = function () {
  const content = document.querySelector('#content')
  const items = [...content.querySelectorAll('.post-grid.clearfix>div')]
  for (let item of items) {
    const attr = item.getAttribute('attr')
    if (attr == null) {
      const id = item.getAttribute('id')
      item.setAttribute('attr', 'value')
      const title = item.querySelector('.entry-title.postli-1>a')
      const scoreDict = score(title)
      if (!scoreDict.status) {
        item.classList.add('none')
      } else {
        item.insertAdjacentHTML('beforeend', `<div class="query-btn" >查看磁力链接</div> <a class="douban" target="_blank" href="https://search.douban.com/movie/subject_search?search_text=${decodeURIComponent(scoreDict.name)}&cat=1002">豆瓣搜索</a>`)
        const btn = item.querySelector('.query-btn')
        btn.addEventListener('click', () => queryBtnClick(id))
      }
    }
  }
}

const openLoading = function () {
  const loading = document.querySelector("#loading")
  loading.classList.remove("none")
}

const closeLoading = function () {
  const loading = document.querySelector("#loading")
  loading.classList.add("none")
}

const addLoading = function () {
  const body = document.querySelector("body")
  const html = `
  <div class="none" id="loading"><div class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div>
  <div id="fiexd_btn"> </div>
  <div id="id-modal" class="none">
    <div class="mark"></div>
    <div class="modal-content">
    </div>
  </div>
  `
  body.insertAdjacentHTML("beforeend", html)
}

const addBtn = function () {
  const container = document.querySelector("#content")
  const html = `
    <div class="btn_box">
      <div class="more_btn _btn">
        加载更多
      </div>
    </div>
  `
  container.insertAdjacentHTML("beforeend", html)
  return container.querySelector(".more_btn")
}

const urlList = function () {
  const result = []
  const n = pageIndex
  let url = location.origin + location.pathname
  if (url.includes('page')) {
    const list = url.split('/')
    list.pop()
    list.pop()
    url = list.join('/')
  }
  for (let i = n + 1; i < n + dxNumber; i++) {
    result.push(`${url}/page/${i}`)
    pageIndex++
  }
  return result
}

const getUrl = function (url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res))
      .catch(() => {
        pageIndex--
        resolve(null)
      })
  })
}

const getMorePage = async function () {
  const urls = urlList()
  const promiseList = urls.map(getUrl)
  let pageHtmls = await Promise.all(promiseList)
  let domList = pageHtmls
    .filter(item => item)
    .map(res => {
      const { data } = res
      const p = new DOMParser()
      const Html = p.parseFromString(data, "text/html")
      const content = Html.querySelector('#content')
      const grid = content.querySelector('.post-grid.clearfix')
      const post = [...grid.querySelectorAll('.post.clearfix')]
      return post.map(p => p.outerHTML).join('\n')
    })
  return domList
}

const loadHtml = async function () {
  openLoading()
  try {
    let rows = await getMorePage()
    const container = document.querySelector("#content .post-grid.clearfix")
    rows.forEach(row => container.insertAdjacentHTML("beforeend", row))
  } catch (error) {
    console.log('异常', error)
  }
  closeLoading()
  checkAllItems()
}

const getHref = function () {
  let href = location.origin + location.pathname
  if (href.includes('page')) {
    const list = href.split('/')
    list.pop()
    href = list.join('/') + `/${pageIndex}`
  } else {
    href += `/page/${pageIndex}`
  }
}

const markEvent = function () {
  document.querySelector('#id-modal .mark').addEventListener('click', () => {
    const modal = document.querySelector('#id-modal')
    modal.classList.add('none')
    modal.querySelector('.modal-content').innerHTML = ''
    document.body.classList.remove('hidde')
  })
}

const eventBtn = function () {
  const btn = addBtn()
  btn.addEventListener("click", async () => {
    const basePageIndex = pageStart()
    const href = getHref()
    if (pageIndex - basePageIndex > 50) {
      window.location.href = href
    } else {
      await loadHtml()
    }
  })
}

export default function () {
  addLoading()
  eventBtn()
  markEvent()
  checkAllItems()
}
