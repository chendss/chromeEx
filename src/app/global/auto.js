import excludes from '@/routers/excludes'

/**
 * 自动缩放
 *
 * @export
 */
export default function () {
  const auto = function () {
    if (excludes()) return
    let dx = window.innerWidth / 1920
    dx = Math.max(dx * 0.91, 1)
    const style = document.documentElement.style
    style.zoom = dx
  }
  window.addEventListener('resize', auto)
  window.addEventListener('load', auto)
  auto()
}
