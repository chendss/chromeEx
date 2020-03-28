const n = 0

const open = window.open

const filterUrl = function (a, key) {
  if (a.href.includes(key)) {
    let href = a.href
    let url = href.replace(key, '')
    a.href = url
    a.onclick = () => {
      let win = open(decodeURIComponent(url))
    }
    a.target = null
    a.href = 'javascript:void(0)'
  }
}

const main = function () {
  try {
    document.querySelectorAll('a').forEach(a => {
      filterUrl(a, 'https://links.jianshu.com/go?to=')
      filterUrl(a, 'https://link.jianshu.com?t=')
      filterUrl(a, 'https://link.jianshu.com/?t=')
    })
  } catch (error) {
    console.log('过滤报错', error)
  }
}

const killA = function () {
  main()
  setTimeout(() => {
    killA()
  }, 300)
}

export default function () {
  killA()
}