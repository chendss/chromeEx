import { jsonOpen } from "@/utils/index"

const insertHtml = function () {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="collect">收集</div>
  `)
}

export default function () {
  insertHtml()
  document.querySelector('#collect').addEventListener('click', () => {
    const iconList = [...document.querySelectorAll('.project-iconlist .icon-item')].map(item => {
      const code = item.querySelector('.icon-code.icon-code-show').innerText
      return code
    })
    jsonOpen(iconList)
    console.log('收集到', JSON.stringify(iconList))
  })
}