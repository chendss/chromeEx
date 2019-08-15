export default function() {
  const auto = function() {
    let dx = window.innerWidth / 1920
    dx = Math.max(dx * 0.9, 1)
    const style = document.documentElement.style
    style.zoom = dx
  }
  window.addEventListener('resize', auto)
  window.addEventListener('load', auto)
  auto()
}
