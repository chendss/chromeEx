/**
 *去掉百度统计代码块
 *
 */
const wasNo = function() {
  let n = 0
  const baidu = setInterval(() => {
    const scripts = [...document.querySelectorAll('script')]
    const baiduScriptList = scripts.filter(script => script.innerHTML.includes('百度统计'))
    baiduScriptList.forEach(script => script.remove())
    if (n++ > 100) {
      clearInterval(baidu)
    }
  }, 100)
}

/**
 * 百度系全局过滤函数入口
 *
 * @export
 */
export default function() {
  wasNo()
}
