import '@/utils/spop.min.js'

const wait = () => {
  return new Promise(resolve => {
    const k = setInterval(() => {
      console.log('hlsUrl', hlsUrl)
      const dom = document.querySelector('#site-content')
      if (hlsUrl !== null && hlsUrl.includes('http') && dom) {
        resolve(true)
        clearInterval(k)
      }
    }, 50)
  })
}

const main = async () => {
  await wait()
  const dom = document.querySelector('#site-content')
  dom.insertAdjacentHTML('afterbegin', `<div id="id-url" style="width: 700px;margin-left: 120px;margin-bottom: 30px;font-size: 24px;overflow: hidden;">${hlsUrl}</div>`)
  const div = document.querySelector('#id-url')
  div.addEventListener('click', () => {
    const input = document.createElement('textarea')
    document.body.appendChild(input)
    input.innerHTML = hlsUrl
    input.select()
    document.execCommand('copy')
    setTimeout(() => {
      input.remove()
    }, 2000)
    spop({
      template: '复制成功',
      position: 'bottom-right',
      style: 'success',
      autoclose: 2000
    })
  })
}

export default main