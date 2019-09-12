import axios from 'axios'

const pageStart = function() {
  const href = location.href
  let n = '0'
  if (href.includes('page')) {
    n = href
      .split('?')[1]
      .split('&')
      .find(item => item.includes('page'))
      .split('=')[1]
  } else {
    n = 1
  }
  return parseFloat(n)
}

let pageIndex = pageStart()

const openLoading = function() {
  const loading = document.querySelector('#loading')
  loading.classList.remove('none')
}

const closeLoading = function() {
  const loading = document.querySelector('#loading')
  loading.classList.add('none')
}

const addLoading = function() {
  const body = document.querySelector('body')
  console.log('sss', body)
  const html = `<div class="none" id="loading"><div class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div>`
  body.insertAdjacentHTML('beforeend', html)
}

const addBtn = function() {
  const container = document.querySelector('#wrapper .container')
  const html = `
    <div class="more_btn">
      加载更多
    </div>
  `
  container.insertAdjacentHTML('beforeend', html)
  return container.querySelector('.more_btn')
}

const urlList = function() {
  const result = []
  const n = pageIndex
  for (let i = n + 1; i < n + 8; i++) {
    const url = location.origin + location.pathname
    result.push(`${url}?page=${i}`)
    pageIndex++
  }
  return result
}

const getMorePage = async function() {
  const urls = urlList()
  const promiseList = urls.map(url => axios.get(url))
  let pageHtmls = await Promise.all(promiseList)
  let domList = pageHtmls.map(res => {
    const { data } = res
    const p = new DOMParser()
    const Html = p.parseFromString(data, 'text/html')
    const row = Html.querySelector('#wrapper .container .row')
    const imgs = [...row.querySelectorAll('.well.well-sm .thumb-overlay .img-responsive')]
    imgs.forEach(img => {
      const imgUrl = img.dataset.original
      img.src = imgUrl
    })
    return row.outerHTML
  })
  return domList
}

const loadHtml = async function(btn) {
  openLoading()
  let rows = await getMorePage()
  const container = document.querySelector('#wrapper .container')
  rows.forEach(row => container.insertAdjacentHTML('beforeend', row))
  container.appendChild(btn)
  closeLoading()
}

const eventBtn = function(btn) {
  btn.addEventListener('click', () => {
    const basePageIndex = pageStart()
    if (pageIndex - basePageIndex > 50) {
      window.location.href = location.origin + location.pathname + `?page=${pageIndex}`
    } else {
      loadHtml(btn)
    }
  })
}

export default function() {
  if (!location.pathname.includes('videos')) return
  addLoading()
  const btn = addBtn()
  eventBtn(btn)
}
