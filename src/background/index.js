import axios from 'axios'
import { queryToObj, objToQuery } from '@/utils'
import kills from './kill.list'

const log = chrome.extension.getBackgroundPage().console.log

var pattern = [
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?merge=1&end_type=1&ad_pos=11,12&t=1566590788044',
  'https://eduad.baidu.com/bidding/wenku_post_json',
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?t=1566590789507&end_type=1&ad_pos=14',
  'https://wenku.baidu.com/common/fc/pc/pz_view?url*',
  'https://www.sojson.com/open/record.shtml',
  'https://wenku.baidu.com/xpage/interface/getadmanageconf?merge=1&end_type=1&ad_pos=11,12&t=1566591972100',
  // 'https://fe-api.zhaopin.com/c/i/sou*'
]

function redirect (requestDetails) {
  log('requestDetails', requestDetails)
  const { url } = requestDetails
  console.log('生成的值', url)
  return {
    // cancel: true,
    redirectUrl: url.replace('pageSize="90"', 'pageSize="180"')
  }
}


chrome.webRequest.onBeforeRequest.addListener(redirect, { urls: pattern }, ['blocking'])