import { log } from "@/utils"
import DB from '@/DB.js'

export default function () {
  setInterval(() => {
    const loginid = DB.get('loginid')
    const passworl = DB.get('userpassword')
    if (loginid == null || passworl == null) return
    log('刷新token，防止登录失效')
    fetch("https://oa.lizhi.fm/api/hrm/login/checkLogin", {
      "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
      },
      "referrer": "https://oa.lizhi.fm/wui/index.html?v=1606611930747",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `islanguid=7&loginid=${loginid}&userpassword=${passworl}&dynamicPassword=&tokenAuthKey=&validatecode=&validateCodeKey=&logintype=1&messages=&isie=false&`,
      "method": "POST",
      "mode": "cors"
    });
  }, 60 * 2)
}