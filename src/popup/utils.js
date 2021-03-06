export const getCurrent = function () {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0]
      resolve(activeTab)
    })
  })
}

export const getAllCookies = function (obj) {
  return new Promise((resolve, reject) => {
    let result = []
    chrome.cookies.getAllCookieStores(storeList => {
      let n = storeList.length
      for (let store of storeList) {
        const storeId = store.id
        chrome.cookies.getAll({ storeId, ...obj }, res => {
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

export const clearCookies = async function () {
  const that = await getCurrent()
  console.log('当前标签', that)
  const url = that.url
  const items = await getAllCookies({ url })
  console.log('得到元素', items)
  for (let item of items) {
    chrome.cookies.remove({ name: item.name, url, storeId: item.storeId }, (...args) => console.log('删除', ...args))
  }
}