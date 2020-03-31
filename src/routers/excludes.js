const href = window.location.href
const rules = ['avgle.com/videos*','avgle.com*'].map(s => new RegExp(s))

/**
 * 是否要缩放此网页
 *
 * @export
 * @returns
 */
export default function() {
  for (let rule of rules) {
    if (rule.test(href)) {
      return true
    }
  }
  return false
}
