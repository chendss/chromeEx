const insertHtml = function () {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="collect">收集</div>
  `)
}

const open = function (json) {
  const content = new Blob([JSON.stringify(json)], { type: "application/json;charset=utf-8" })
  let a = document.createElement('a')
  a.href = URL.createObjectURL(content)
  a.target = '_Blank'
  a.click()
}

export default function () {
  insertHtml()
  document.querySelector('#collect').addEventListener('click', () => {
    const iconList = [...document.querySelectorAll('.project-iconlist .icon-item')].map(item => {
      const code = item.querySelector('.icon-code.icon-code-show').innerText
      return code
    })
    open(iconList)
    console.log('收集到', JSON.stringify(iconList))
  })
}