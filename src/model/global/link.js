/**
 * 粘贴板过滤
 *
 */
const clearCopy = function () {
  const current = document.addEventListener
  const dcurrent = EventTarget.prototype.addEventListener
  document.addEventListener = function (type, ...args) {
    if (type === 'copy') {
      return
    } else {
      current(type, ...args)
    }
  }
  EventTarget.prototype.addEventListener = function (type, ...args) {
    if (type === 'copy') {
      return
    } else {
      const k = dcurrent.bind(this)
      k(type, ...args)
    }
  }
}

/**
 * 清空返利连接
 *
 */
const backLink = function () {
  function setcookie(name, domain) {
    document.cookie = name + '=' + '' + ';path=/;domain=' + domain
  }
  var jdad = new Array(
    'USER_FLAG_CHECK',
    'm.jd.com',
    '__jda',
    'jd.com',
    '__jdb',
    'jd.com',
    '__jdc',
    'jd.com',
    '__jdu',
    'jd.com',
    '__jdv',
    'jd.com',
    '__mjdv',
    'm.jd.com',
    '__tra',
    'jd.com',
    '__trb',
    'jd.com',
    '__trc',
    'jd.com',
    '__tru',
    'jd.com',
    '__trv',
    'jd.com',
    '__utmmobile',
    'm.jd.com',
    'abtest',
    'm.jd.com',
    '__jda',
    'jd.hk',
    '__jdb',
    'jd.hk',
    '__jdc',
    'jd.hk',
    '__jdv',
    'jd.hk',
    'unpl',
    'jd.com',
    'pinld',
    'jd.com',
    'mt_xid',
    'jd.com',
    '_tp',
    'jd.com'
  )
  var zad = new Array(
    'at-main',
    'amazon.cn',
    'sess-at-main',
    'amazon.cn',
    'session-id',
    'amazon.cn',
    'session-id-time',
    'amazon.cn',
    'x-wl-uid',
    'amazon.cn',
    'session-token',
    'amazon.cn'
  )
  var yxad = new Array(
    '__jda',
    'yixun.com',
    '__jdb',
    'yixun.com',
    '__jdc',
    'yixun.com',
    '__jdu',
    'yixun.com',
    '__jdv',
    'yixun.com',
    'cps_cookies',
    'yixun.com',
    'cps_tkd',
    'yixun.com'
  )
  var yhad = new Array('unionKey', 'yhd.com', 'websiteid', 'yhd.com', 'uid', 'yhd.com')
  var suad = new Array('_snmb', 'suning.com', '_snmp', 'suning.com', '_snsr', 'suning.com', 'traceId', 'suning.com')
  var ddad = new Array(
    '__ddc_15d',
    'dangdang.com',
    '__ddc_15d_f',
    'dangdang.com',
    '__ddc_1d',
    'dangdang.com',
    '__ddc_24h',
    'dangdang.com',
    '_jzqco',
    'dangdang.com',
    'from',
    'dangdang.com',
    'nTalk_CACHE_DATA',
    'dangdang.com',
    'order_follow_source',
    'dangdang.com',
    'out_refer',
    'dangdang.com',
    'pos_6_end',
    'dangdang.com'
  )
  var tmad = new Array('isg', 'tmall.com', 'l', 'tmall.com', 'pnm_cku822', 'detail.tmall.com')
  var tbad = new Array(
    '_cc_',
    'taobao.com',
    '_tb_token_',
    'taobao.com',
    'miid',
    'taobao.com',
    't',
    'taobao.com',
    'uss',
    'taobao.com'
  )
  if (window.location.host.indexOf('jd.') > 0) {
    if (window.location.host.indexOf('re.jd.com') == 0) {
      location.replace(document.getElementsByClassName('gobuy')[0].getElementsByTagName('a')[0].href)
    }
    if (window.location.search.indexOf('jd_pop=') > 0 || window.location.search.indexOf('utm_source') > 0) {
      for (i = 0; i < jdad.length; i++) {
        setcookie(jdad[i], jdad[i + 1])
      }
      location.replace(window.location.origin + window.location.pathname)
    }
  }
  if (window.location.host == 'www.amazon.cn' && window.location.search.indexOf('tag=') > 0) {
    window.addEventListener(
      'load',
      function () {
        setTimeout(zadkill, 1500)
      },
      false
    ) //亚马逊的cookies似乎是在加载完成后才写入，必须加延迟
  }
  function zadkill() {
    for (i = 0; i < zad.length; i++) {
      setcookie(zad[i], zad[i + 1])
    }
    document.cookie = 'csm-hit=;path=/;'
    sessionStorage.clear()
    location.replace(window.location.origin + window.location.pathname)
  }
  if (window.location.host.indexOf('yixun') > 0 && window.location.search.indexOf('YTAG=') == 1) {
    for (i = 0; i < yxad.length; i++) {
      setcookie(yxad[i], yxad[i + 1])
    }
    window.location.href = window.location.origin + window.location.pathname
  }
  if (window.location.host.indexOf('yhd.com') > 0 && window.location.search.indexOf('tracker_u') > 0) {
    for (i = 0; i < yhad.length; i++) {
      setcookie(yhad[i], yhad[i + 1])
    }
    location.replace(window.location.origin + window.location.pathname)
  }
  if (window.location.host.indexOf('suning.com') > 0 && window.location.search.indexOf('utm_campaign') > 0) {
    for (i = 0; i < suad.length; i++) {
      setcookie(suad[i], suad[i + 1])
    }
    location.replace(window.location.origin + window.location.pathname)
  }
  if (window.location.host.indexOf('dangdang') > 0 && window.location.search.indexOf('_ddclickunion') > 0) {
    for (i = 0; i < ddad.length; i++) {
      setcookie(ddad[i], ddad[i + 1])
    }
    location.replace(window.location.origin + window.location.pathname)
  }
  if (document.location.host.indexOf('tmall.com') > 0 && document.location.search.indexOf('ali_trackid') > 0) {
    for (i = 0; i < tmad.length; i++) {
      setcookie(tmad[i], tmad[i + 1])
    }
    location.replace(document.location.href.slice(0, document.location.href.indexOf('ali_trackid')))
  }
  if (document.location.host.indexOf('taobao.com') > 0 && document.location.search.indexOf('ali_trackid') > 0) {
    window.addEventListener(
      'load',
      function () {
        setTimeout(tbadkill, 1500)
      },
      false
    )
  }
  function tbadkill() {
    for (i = 0; i < tbad.length; i++) {
      setcookie(tbad[i], tbad[i + 1])
    }
    location.replace(document.location.href.slice(0, document.location.href.indexOf('&')))
  }
  if (document.location.host.indexOf('smzdm.com') > 0) {
    document.body.addEventListener('mousedown', function () {
      var dlink = document.getElementsByClassName('feed-link-btn-inner')
      var buylink = document.getElementsByClassName('buy')
      var l = new Array()
      for (i = 0; i < dlink.length; i++) {
        l[i] = dlink[i].getElementsByTagName('a')[0].href
        if (dlink[i].getElementsByTagName('a')[0].href.indexOf('tmall') > 0) {
          dlink[i].removeChild(dlink[i].getElementsByTagName('a')[0])
          var link = document.createElement('a')
          var link = document.createElement('a')
          link.innerHTML = 'clear'
          link.setAttribute('class', 'z-btn z-btn-red')
          link.setAttribute('onclick', "window.open('" + l[i] + "')")
          dlink[i].appendChild(link)
        }
      }
      if (buylink.length && buylink[0].getElementsByTagName('a')[0].rel != '') {
        var buy = buylink[0].getElementsByTagName('a')[0].href
        buylink[0].removeChild(buylink[0].getElementsByTagName('a')[0])
        var link = document.createElement('a')
        link.innerHTML = 'clear'
        //link.setAttribute("class","z-btn z-btn-red");
        link.setAttribute('onclick', "window.open('" + buy + "')")
        buylink[0].appendChild(link)
      }
    })
  }
}

/**
 * 链接清洗 入口
 *
 * @export
 */
export default function () {
  clearCopy()
  backLink()
}
