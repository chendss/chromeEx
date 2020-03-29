import { get } from "../../utils"

export const transferProcess = function (mapData) {
  const res = get(mapData, 'plans', []).map(pObj => {
    const paths = pObj.segments.map(s => ({ time: s.time, text: s.instruction }))
    const resultList = {
      paths: paths,
      cost: pObj.cost, time: pObj.time
    }
    return resultList
  })
  return res
}

export const homeClick = function (homeBox, event, id, value) {
  const target = event.target
  const btns = [...homeBox.querySelectorAll('._btn')]
  btns.forEach(btn => btn.setAttribute('type', 'b'))
  target.setAttribute('type', 'p')
  const point = JSON.parse(target.getAttribute('point'))
  const trBox = document.querySelector(`#${id} .result-box`)
  trBox.classList.remove('none')
  const search = document.querySelector('#search-input')
  search.value = value
  return point
}

export const postionEnter = function (event, map, addMark) {
  const code = event.keyCode
  if (code + '' === '13') {
    const target = event.target
    const value = target.value
    const point = value.split(',').map(i => Number(i))
    if (point instanceof Array && point.length > 1) {
      map.clearMap()
      addMark(point)
      map.panTo(point)
      map.setZoom(18)
    }
  }
}