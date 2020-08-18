import { es, qs, q, e } from '@/utils/tools'

export default function () {
  window.r9aeadS = function () {
    console.log('我被调用')
    return true
  }
  Object.defineProperty(window, 'r9aeadS', {
    writable: false
  })
}
