import './index.scss'

const getCurrent = function () {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0]
      resolve(activeTab)
    })
  })
}

const getAllCookies = function (obj) {
  return new Promise((resolve, reject) => {
    let result = []
    chrome.cookies.getAllCookieStores((storeList) => {
      let n = storeList.length
      for (let store of storeList) {
        const storeId = store.id
        chrome.cookies.getAll({ storeId, ...obj }, (res) => {
          n -= 1
          result.push(...res)
          if (n <= 0) {
            resolve(result)
          }
        })
      }
    })
  })
}

const clearCookies = async function () {
  const that = await getCurrent()
  console.log('当前标签', that)
  const url = that.url
  const items = await getAllCookies({ url })
  console.log('得到元素', items)
  for (let item of items) {
    chrome.cookies.remove({ name: item.name, url, storeId: item.storeId }, (...args) => console.log('删除', ...args))
  }
}

const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<button id="clear">清空缓存</button>')
const btn = document.querySelector('#clear')
btn.addEventListener('click', async () => {
  await clearCookies()
  chrome.tabs.sendMessage(that.id, '清空缓存去', (...args) => {
    console.log('..相应', ...args)
  })
})
