const log = chrome.extension.getBackgroundPage().console.log

var pattern = [
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?merge=1&end_type=1&ad_pos=11,12&t=1566590788044',
  'https://eduad.baidu.com/bidding/wenku_post_json',
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?t=1566590789507&end_type=1&ad_pos=14',
  'https://wenku.baidu.com/common/fc/pc/pz_view?url*',
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?merge=1&end_type=1&ad_pos=11,12&t=1566591972100',
]

function redirect (requestDetails) {
  return {
    cancel: true,
  }
}

chrome.webRequest.onBeforeRequest.addListener(redirect, { urls: pattern }, ['blocking'])
