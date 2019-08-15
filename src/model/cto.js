export default function() {
  let n = 0
  const clearMask = setInterval(() => {
    const closeMb = document.querySelector('.closeMB')
    n++
    if (closeMb) {
      const parent = closeMb.parentElement
      const root = parent.parentElement
      root.remove()
      clearInterval(clearMask)
    }
    if (n > 50) {
      console.log('51cto结束屏蔽')
      clearInterval(clearMask)
    }
  }, 300)
}
