import './wangpanlink'
import { sample } from 'lodash'
import { dataset, datasetFind } from '../../utils'

const db = dataset('/path/wuai.db')

const replyHtml = function () {
  const parent = document.querySelector('#jz52top')
  const span = `<span><a href="javascript:void(0);" onclick="reply()" class="replyfast" title="快速回复"><b>快速回复</b></a></span>`
  parent.insertAdjacentHTML('beforeend', span)
}

const 文案 = function () {
  const list = [
    '楼主优秀啊',
    '用来干嘛啊',
    '感谢原创！！',
    '666 老铁',
    '楼主大佬加油！',
    '学习了，谢谢分享',
    '顶起来··支持下',
    '好东西，收了看看',
    '6666感谢大佬',
    '66666很社会',
    '真特娘的是个人才',
    '666，学习学习',
    '感谢楼主！厉害了',
    '目测还可以,感谢',
    '你的币有了！太棒了',
    '谢谢分享,谢谢分享',
    '感谢大佬，先给个赞',
    '只有下下来看一下了',
    '很好的工具，谢谢楼主',
    '楼主，你可真是个人才',
    '太棒了 谢谢,谢谢分享',
    '啊~我的眼睛，哈哈哈哈',
    '谢谢楼主提供支援，收下了',
    'hhhh太逗了吧，试一试',
    '够小，够好！感谢楼主分享',
    '只有自己试了，没看懂什么',
    '我有一句牛逼不知该说不该说',
    '是游戏不好玩还是酒不好喝？',
    '楼主牛皮，加油啊，再接再厉',
    '软件值得下载。感谢楼主付出！',
    '如果好用的话，就很适合我使用了',
    '谢谢楼主的分享，这个绝对要顶！',
    '很实用的好工具，谢谢分享!!!',
    '谢谢楼主的分享，这个绝对要顶！',
    '精神污染。。。这个刺激，哈哈哈。',
    '研究了一段时间这个最后放弃了，哎',
    '支持原创，鞋谢分享 支持原创，鞋谢分享',
    '看着还不错，感谢楼主的奉献。正好要用到',
    '☆.。.:*(嘿&#180;Д｀嘿).。.:*',
    '优秀，太优秀了，very very优秀，谢谢分享，下载下来看看',
  ]
  return sample(list)
}

const reply = function () {
  const textarea = document.querySelector('#fastpostmessage')
  textarea.value = 文案()
  const btn = document.querySelector('#fastpostsubmit')
  btn.click()
}

export default function () {
  replyHtml()
  window.reply = reply
  const dict = datasetFind(db, { id: window.location.href })
  if (dict == null) {
    setTimeout(() => {
      reply()
      db.insert({ id: window.location.href })
    }, 500)
  }
  chrome.runtime.sendMessage('edggalppcgbgdhbfobcnanmpflpekohl',
    {
      // 里面的值应该可以自定义，用于判断哪个请求之类的
      type: 'fetch',
      url: 'https://btools.cc/zatsudan-1/' // 需要请求的url
    },
    response => {
      console.log('hhh', response)
      const dd = JSON.parse(response.text())
    }
  )
}

