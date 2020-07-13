export default function () {
  const addEventListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (key, ...otherProps) {
    if (key === 'copy') {
      return
    }
    addEventListener(key, ...otherProps)
  }
}