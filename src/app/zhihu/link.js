import { qs } from '@/utils/tools'

const render = function () {
  const links = qs('a').filter(a => a.href != null && a.href.includes('?target='))
  for (let link of links) {
    const href = link.href
    const url = href.split('?target=')[1]
    link.href = decodeURIComponent(url)
  }
}

const main = function () {
  setTimeout(() => {
    render()
    main()
  }, 500)
}

export default function () {
  main()
}