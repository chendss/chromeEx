const iocHtml = function() {
  let html = `<div class="custom-dig custom-dig-hiddle">
                <div class="downFile_" id="fuck_down">真正下载</div>
            </div>
            `
  document.body.insertAdjacentHTML('beforeend', html)
}

const waitDownBtn = function(callCode) {
  return new Promise((resolve, reject) => {
    const code = callCode.replace(/\s/g, '')
    const funName = code.split('(')[0]
    const id = code
      .split('(')[1]
      .split(')')[0]
      .replace("'", '')
      .replace("'", '')
    window[funName](id)
    setInterval(() => {
      const doms = document.querySelectorAll('.down_btn')
      if (doms.length > 2) {
        resolve([...doms])
      }
    }, 100)
  })
}

const addEvent = function() {
  document.querySelector(`#fuck_down`).addEventListener('click', async () => {
    const str = window.check_code.toString()
    const callCode = str.split('\n').find(s => s.includes('load_down_addr1'))
    const downs = await waitDownBtn(callCode)
    const down = downs.find(d => d.innerText.includes('普通下载'))
    down.click()
  })
}

export default function() {
  iocHtml()
  addEvent()
  window.go = function() {
    console.log('想跳转？不可能')
  }
}
