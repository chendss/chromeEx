import { log } from "../../utils"

export default function () {
  const k = setInterval(() => {
    const m = document.querySelector('#SFUserId')
    if (m == null) {
      document.head.insertAdjacentHTML('beforeend', '<meta name="userId" value="233" id="SFUserId">')
    } else {
      clearInterval(k)
    }
  }, 100)
  const addEventListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (key, ...otherProps) {
    if (key === 'copy') {
      return
    }
    addEventListener(key, ...otherProps)
  }
}