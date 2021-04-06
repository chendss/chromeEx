import axios from 'axios'
import { get } from '../../utils'
import { q, qs } from '../../utils/tools'
import { throttle } from 'lodash'

const searchList = []

const getHtml = async function (page) {
  const url = `https://gitlab.lizhi.fm/?non_archived=true&page=${page}&sort=name_asc`
  const res = await axios.get(url)
  let data = get(res, 'data', '<html></html>')
  const p = new DOMParser()
  const Html = p.parseFromString(data, "text/html")
  const list = [...Html.querySelectorAll('.projects-list .project-details .flex-wrapper')]
  const infos = list.map(item => {
    const name = item.querySelector('.namespace-name').innerHTML + item.querySelector('.project-name').innerHTML
    const p = item.querySelector('.description p')
    const description = get(p, 'innerHTML', '')
    const href = item.querySelector('.text-plain').href
    return { name, description, href }
  })
  return infos
}

const promiseList = function () {
  const maxPages = Math.max(...qs('.pagination.justify-content-center .page-item .page-link').map(link => link.innerHTML).filter(h => {
    const n = Number(h)
    return n === n
  }))
  const result = []
  for (let index = 1; index <= maxPages; index++) {
    result.push(getHtml(index))
  }
  return result
}

const inputChange = throttle((e) => {
  const target = e.target
  const value = target.value
  const result = []
  for (let item of searchList) {
    const { name, description } = item
    if (name.includes(value) || description.includes(value)) {
      result.push(item)
    }
  }
}, 200)

export default async function () {
  const form = q('#project-filter-form')
  form.insertAdjacentHTML('beforeend', '<input type="search" id="search_project" class="form-control">')
  const input = q('#search_project')
  const htmls = await Promise.all(promiseList())
  const searchs = htmls.reduce((pre, item) => {
    pre.push(...item)
    return pre
  }, [])
  searchList.push(...searchs)
  input.addEventListener('input', inputChange)
}