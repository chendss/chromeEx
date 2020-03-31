import { clearCookie } from '@/utils/tools'

export default function () {
  clearCookie()
  const href = window.location.href
  window.location.href = href.replace('/file/', '/down/')
}
