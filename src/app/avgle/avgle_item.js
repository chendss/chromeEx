export default function () {
  return
  if (location.pathname.includes('videos')) return
  let config = {
    referer: window.location.href,
    name: document.title.split('-')[0].trim(),
    m3u8: '未知',
  }
  const post = function (url) {
    let str = document.querySelector('.custom-box').value
    let data = JSON.parse(str)
    data.m3u8 = document.querySelector('#custom-box2').value
    data = JSON.stringify(data)
    window.$.ajax({
      url: url,
      type: 'post',
      contentType: 'application/json',
      data: data,
      success: function () { },
      error: function () {
        alert('失败')
        console.log(arguments)
      },
    })
  }
  let html = `<div class="custom-dig custom-dig-hiddle">
                <textarea class="custom-box">${JSON.stringify(config)}</textarea>
                <textarea id="custom-box2"></textarea>
                <button class="custom-btn-close btn">关闭</button>
                <button class="custom-btn-sub btn">提交</button>
                <button class="custom-btn-del btn">删除</button>
            </div>
            <button class="custom-btn">弹出</button>
            <button class="custom-btn start">开始</button>
            `
  document.body.insertAdjacentHTML('beforeend', html)
  document.querySelector('.custom-btn').addEventListener('click', () => {
    let div = document.querySelector('.custom-dig-hiddle')
    div.classList.remove('custom-dig-hiddle')
  })
  document.querySelector('.custom-btn-sub').addEventListener('click', () => {
    let url = 'http://127.0.0.1:9090/add'
    post(url)
  })
  document.querySelector('.custom-btn-del.btn').addEventListener('click', () => {
    let url = 'http://127.0.0.1:9090/del'
    post(url)
  })
  document.querySelector('.custom-btn.start').addEventListener('click', () => {
    let url = 'http://127.0.0.1:9090/start'
    post(url)
  })
  document.querySelector('.custom-btn-close').addEventListener('click', () => {
    let div = document.querySelector('.custom-dig')
    div.classList.add('custom-dig-hiddle')
  })
  window.closeAd && window.closeAd()
}
