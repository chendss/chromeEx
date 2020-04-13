import axios from 'axios'

const log = chrome.extension.getBackgroundPage().console.log

var pattern = [
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?merge=1&end_type=1&ad_pos=11,12&t=1566590788044',
  'https://eduad.baidu.com/bidding/wenku_post_json',
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?t=1566590789507&end_type=1&ad_pos=14',
  'https://wenku.baidu.com/common/fc/pc/pz_view?url*',
  'https://www.sojson.com/open/record.shtml',
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?merge=1&end_type=1&ad_pos=11,12&t=1566591972100',
]
function redirect(requestDetails) {
  log('不信', requestDetails)
  return {
    cancel: true,
  }
}


chrome.webRequest.onBeforeRequest.addListener(redirect, { urls: pattern }, ['blocking'])

chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    log('真的麻烦')
    if (request.type == 'fetch') {
      sendResponse('fffffdd多大但')

      return true

    }
  })