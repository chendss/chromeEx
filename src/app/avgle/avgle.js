import axios from "axios"
import DB from '@/utils/DB'
import { openLoading, closeLoading } from '@/utils/index'
import { get, toNumber } from "lodash"

const dxNumber = toNumber(get(DB.get("av"), "number", "8"))

const pageStart = function () {
  const href = location.href
  let n = "0"
  if (href.includes("page")) {
    n = href
      .split("?")[1]
      .split("&")
      .find(item => item.includes("page"))
      .split("=")[1]
  } else {
    n = 1
  }
  return parseFloat(n)
}

let pageIndex = pageStart()

const addLoading = function () {
  const body = document.querySelector("body")
  const html = `
  <div id="fiexd_btn"> </div>
  `
  body.insertAdjacentHTML("beforeend", html)
}

const addBtn = function () {
  const container = document.querySelector("#wrapper .container")
  const html = `
    <div class="btn_box">
      <div class="more_btn _btn">
        加载更多
      </div>
      <div class="reset_btn _btn">
        刷新页面 ${pageIndex}
      </div>
    </div>
  `
  container.insertAdjacentHTML("beforeend", html)
  return [
    container.querySelector(".more_btn"),
    container.querySelector(".reset_btn")
  ]
}

const inputHtml = function () {
  const container = document.body
  const html = `
    <div class="input-box-2">
      <input id="input-number" type="number">
      <button id="confirm">确定</button>
    </div>
  `
  container.insertAdjacentHTML("beforeend", html)
  return [
    container.querySelector("#input-number"),
    container.querySelector("#confirm")
  ]
}

const urlList = function () {
  const result = []
  const n = pageIndex
  for (let i = n + 1; i < n + dxNumber; i++) {
    const url = location.origin + location.pathname
    result.push(`${url}?page=${i}`)
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
      const row = Html.querySelector("#wrapper .container .row")
      const imgs = [
        ...row.querySelectorAll(".well.well-sm .thumb-overlay .img-responsive")
      ]
      imgs.forEach(img => {
        const imgUrl = img.dataset.original
        img.src = imgUrl
      })
      return row.outerHTML
    })
  return domList
}

const loadHtml = async function () {
  openLoading()
  let rows = await getMorePage()
  const container = document.querySelector("#wrapper .container")
  rows.forEach(row => container.insertAdjacentHTML("beforeend", row))
  const dom = document.querySelector("#wrapper .container .btn_box")
  container.appendChild(dom)
  closeLoading()
}

/**
 * 页面重绘
 *
 */
const reset = function () {
  const href = location.origin + location.pathname + `?page=${pageIndex}`
  window.location.href = href
}

const eventBtn = function () {
  const [btn, resetBtn] = addBtn()
  btn.addEventListener("click", async () => {
    const basePageIndex = pageStart()
    const href = location.origin + location.pathname + `?page=${pageIndex}`
    if (pageIndex - basePageIndex > 50) {
      window.location.href = href
    } else {
      await loadHtml()
      resetBtn.innerText = `刷新 ${pageIndex}`
    }
  })
  resetBtn.addEventListener("click", reset)
}

const eventInput = function () {
  const [inputDom, confirmDom] = inputHtml()
  inputDom.value = dxNumber
  confirmDom.addEventListener("click", () => {
    const val = inputDom.value
    DB.set("av", { number: val })
    reset()
  })
}

export default function () {
  if (!location.pathname.includes("videos")) return
  // addLoading()
  // eventBtn()
  // eventInput()
}
