import $ from 'jquery'
import { log } from '../utils'

const clickMore = function() {
  document.querySelector('.moreBtn.goBtn').click()
}

const copyDoc = function() {
  let timeoutId = -1
  let downloadBtn =
    '<div id="reader-copy-div" style="float:left;padding:10px 20px;background:green;z-index:999;position:relative;top:60px;left:0px;"><a id="reader-copy-text" href="###" style="color:white;font-size:15px;"><b class="ui-btn-btc">Copy Page</b></a></div>'
  let toastDiv =
    '<div id="page-toast-div" style="margin: 0px auto;background: black;opacity: 0.8;padding: 15px 30px;position: fixed;z-index: 10001;display: block;top: 85%;left: 44%;"><span id="page-toast-span" style="color:white;font-size:15px;"></span></div>'
  let opacity = '0.95'
  let ua = navigator.userAgent
  if (ua.indexOf('Edge') >= 0) {
    opacity = '0.6'
  } else if (ua.indexOf('Chrome')) {
    opacity = '0.95'
  }
  let textBlockDiv =
    '<div id="page-textblock-div" style="width:100%;height:100%;position: fixed;z-index: 9999;display: block;top: 0px;left: 0px;background:rgba(255,255,255,' +
    opacity +
    ');-webkit-backdrop-filter: blur(20px);display: flex;justify-content:center;align-items:center;"><div id="page-textblock-cancel-layer" style="width:100%;height:100%;position:fixed;top:0px;left:0px;"></div><pre id="page-textblock" style="width:60%;font-size:16px;line-height:22px;z-index:10000;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;word-break:break-all;max-height:70%;overflow:auto;"></pre></div>"'

  function ShowToast(str) {
    if (timeoutId >= 0) {
      clearTimeout(timeoutId)
    }
    $('#page-toast-div').remove()
    $('body').append(toastDiv)
    $('#page-toast-span').text(str)
    timeoutId = setTimeout("$('#page-toast-div').remove();", 1500)
  }
  function ShowTextBlock(str) {
    $('#page-textblock-div').remove()
    $('body').append(textBlockDiv)
    log('str', str)
    $('#page-textblock').html(str)
    $('#page-textblock-cancel-layer').click(function() {
      $('#page-textblock-div').remove()
    })
  }
  function PrependButtonTo(ele) {
    ele.prepend(downloadBtn)
    ele.find('#reader-copy-text').click(function() {
      let str = ''
      let parent = $(this)
        .parent()
        .parent()
      parent.find('.reader-word-layer').each(function() {
        str += this.innerText.replace(/\u2002/g, ' ')
      })
      str = str.replace(/。\s/g, '<br>')
      let result = str.length > 0
      if (result) {
        ShowToast('successful')
        ShowTextBlock(str)
      } else {
        ShowToast('error，warting loading')
      }
    })
  }
  $('.mod.reader-page.complex').each(function() {
    PrependButtonTo($(this))
  })
}

export default function() {
  copyDoc()
  clickMore()
}
