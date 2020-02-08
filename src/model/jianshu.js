const n = 0

const open = window.open

const killA = function () {
  setInterval(() => {
    try {
      document.querySelectorAll('a').forEach(a => {
        if (a.href.includes('https://links.jianshu.com/go?to=')) {
          let href = a.href
          let url = href.replace('https://links.jianshu.com/go?to=', '')
          a.href = url
          a.onclick = () => {
            let win = open(decodeURIComponent(url))
          }
          a.target = null
          a.href = 'javascript:void(0)'
        }
      })
    } catch (error) {
      console.log('过滤报错', error)
    }
  }, 100)
}

export default function () {
  killA()
}