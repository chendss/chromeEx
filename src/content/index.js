const href = window.location.href
import icoHandle from '../utils/index'

const loadAction = function (handle) {
  window.addEventListener('load', handle)
}
const actionJs = function (rule) {
  const load = rule.load || false
  const { js } = rule
  const action = js || function () { }
  load ? loadAction(action) : action()
}

const main = function () {
  if (href.includes('localhost:')) {
    return
  }
  icoHandle(actionJs)
}

main()
