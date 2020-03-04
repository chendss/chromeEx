export default function () {
  setInterval(() => {
    const a_list = [...document.querySelectorAll('#res a')]
    for (let a of a_list) {
      const target = a.getAttribute('target')
      if (target == null) {
        a.setAttribute('target', '_blank')
      }
    }
  }, 300)
}