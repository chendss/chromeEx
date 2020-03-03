export default function () {
  setInterval(() => {
    const div_list = [...document.querySelectorAll('div:not(#foot)')]
    const a_list = div_list.reduce((pre, div) => {
      const links = [...div.querySelectorAll('a')]
      pre.push(...links)
      return pre
    }, [])
    for (let a of a_list) {
      const target = a.getAttribute('target')
      if (target == null) {
        a.setAttribute('target', '_blank')
      }
    }
  }, 300)
}