const href = window.location.href
import icoHandle from '../utils/index'

const loadAction = function(handle) {
  window.addEventListener('load', handle)
}

const actionJs = function(rule) {
  const load = rule.load || false
  const { js } = rule
  const action = js || function() {}
  load ? loadAction(action) : action()
}

const main = function() {
  if (href.includes('localhost:')) {
    return
  }
  icoHandle(actionJs)
}

main()
console.log('插件加载')
window.addEventListener('load', event => {
  chrome.runtime.sendMessage(
    {
      msg: '从 Content Script 向 事件页面 传递消息',
      result: 1,
    },
    function(response) {
      if (response && response.msg) {
        console.log(response.msg, '返回的玩意')
      }
    }
  )
})
