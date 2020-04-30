import { q } from '@/utils/tools'

const size = function () {
  const canvas = q('#id-canvas')
  canvas.width = Math.max(300, document.body.clientWidth - 500)
  canvas.height = document.body.clientHeight - 300
}

export default function () {
  document.addEventListener('resize', size)
  size()
}