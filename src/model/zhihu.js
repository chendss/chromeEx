import $ from 'jquery'

const replaceAllLinkZhihu = function() {
  function replaceAllLink() {
    let as = document.getElementsByTagName('a')
    for (let i = 0; i < as.length; i++) {
      if (as[i].href.indexOf('link.zhihu.com/?target=') !== -1) {
        as[i].href = decodeURIComponent(
          as[i].href.replace('http://link.zhihu.com/?target=', '').replace('https://link.zhihu.com/?target=', '')
        )
      }
    }
  }
  //给所有得加载更多按钮都加上监听
  function replaecAllMoreBtnFun() {
    let btns = document.getElementsByClassName('ContentItem-more')
    for (let i = 0; i < btns.length; i++) {
      btns[i].onclick = function(ev) {
        setTimeout(replaceAllLink, 800)
      }
    }
  }
  //载入页面的时候加入一次
  setTimeout(replaceAllLink, 600)
  replaecAllMoreBtnFun()
  //每1秒执行一次
  let offHeight_Q09ESU5HTXlTZWxG = document.body.offsetHeight
  let offHeight_Q09ESU5HTXlTZWxG_TEMP = 0
  setInterval(function() {
    if ((offHeight_Q09ESU5HTXlTZWxG_TEMP = document.body.offsetHeight) !== offHeight_Q09ESU5HTXlTZWxG) {
      offHeight_Q09ESU5HTXlTZWxG = offHeight_Q09ESU5HTXlTZWxG_TEMP
      setTimeout(replaceAllLink, 600)
      replaecAllMoreBtnFun()
    }
  }, 1000)
}

/**
 * 知乎优化
 *
 * @export
 */
export default function() {
  replaceAllLinkZhihu()
  an()
}
