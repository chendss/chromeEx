import $ from 'jquery'

const simple = function() {
  let topPic = document.querySelector('#custombg')
  topPic.removeChild(topPic.firstChild)
  let subForumsC = document.querySelector('#sub_forums_c')
  subForumsC.style.display = 'none'
  let toppedTopic = document.querySelector('#toppedtopic')
  toppedTopic.style.display = 'none'
  const toggle = () => {
    toppedTopic.style.display = toppedTopic.style.display === 'none' ? 'block' : 'none'
    subForumsC.style.display = subForumsC.style.display === 'none' ? 'block' : 'none'
  }

  const container = document.querySelector('#toptopics a[class="block_txt block_txt_c0"]')
  container.href = 'javascript:;'
  container.addEventListener('click', toggle)
}

const overseas = function() {
  setInterval(function() {
    var imgsReg = new RegExp('img.nga.178.com')
    var replaceImgUrl = function() {
      var url = $(this).attr('src')
      if (undefined !== url && '' !== url) {
        $(this).attr('src', url.replace(imgsReg, 'img7.nga.178.com'))
      }
    }

    $(document).ready(function() {
      $('img').each(replaceImgUrl)
    })
  }, 1000)
}

const loadNGAPlugin = function() {
  var head = document.getElementsByTagName('head')[0]
  var script = document.createElement('script')
  script.src = 'http://code.taobao.org/svn/myfirefoxsupport/trunk/nga/nga_command.js'
  head.appendChild(script)
}

const replaceSponsoredLinks = function() {
  var scripts = document.querySelectorAll('script')
  scripts.forEach(function(script) {
    // 删生成tagtic.cn的js
    var minnerText = script.innerText.match(/http:\/\/g1.tagtic.cn\/v1\/xingyou\/c/)
    if (minnerText) {
      // console.log("Running");
      var a = script.innerText
      a = a.replace(/http:\/\/g1.tagtic.cn\/v1\/xingyou\/c/, '')
      script.innerText = a
      // console.log( script.innerText );
    }
    // 删tagtic.cn的js
    var msrc = script.src.match(/g1.tagtic.cn/)
    // delete hm.baidu.com
    var mbaidu = script.src.match(/hm.baidu.com/)
    if (msrc || mbaidu) {
      script.remove()
    }
  })
}

/**
 * nga论坛优化
 *
 * @export
 */
export default function() {
  simple()
  overseas()
  loadNGAPlugin()
  replaceSponsoredLinks()
  console.log('ngs加载规则')
}
