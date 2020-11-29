export default {
  ip: {
    css: () => require('../app/easy/ip.scss'),
  },
  global: {
    js: () => require('../app/global/index').default(),
    css: () => require('../app/global/styles/index.scss')
  },
  '89File': {
    css: () => require('../app/89File/index.scss'),
    js: () => require('../app/89File/index').default(),
    load: true,
  },
  '89FileDown': {
    css: () => require('../app/89File/index.scss'),
    js: () => require('../app/89File/89FileDown').default(),
    load: true,
  },
  avgle_item: {
    css: () => require('../app/avgle/avgle_item.scss'),
    js: () => require('../app/avgle/avgle_item.scss').default(),
    load: true,
  },
  avgle: {
    css: () => require('../app/avgle/avgle.scss'),
    js: () => require('../app/avgle/avgle').default(),
    load: true,
  },
  cto: {
    js: () => require('../app/easy/cto').default(),
    css: () => require('../app/easy/cto.scss'),
    load: true,
  },
  nga: {
    js: () => require('../app/easy/nga').default(),
    load: true,
  },
  imooc: {
    css: () => require('../styles/imooc.scss'),
  },
  youdao: {
    css: () => require('../styles/youdao.scss'),
  },
  baidu: {
    js: () => require('../app/baidu').default(),
    css: () => require('../app/baidu/index.scss'),
    load: true,
  },
  qrCode: {
    js: () => require('../model/qrCode').default(),
    css: () => { },
    load: true,
  },
  ruan: {
    js: () => require('../app/ruan').default(),
    css: () => require('../app/ruan/index.scss'),
    load: true,
  },
  wenku: {
    js: () => require('../model/wenku').default(),
    css: () => require('../styles/wenku.scss'),
    load: true,
  },
  csdn: {
    css: () => require('../app/csdn/csdn.scss'),
    js: () => require('../app/csdn/csdn.js').default(),
  },

  'vue-cli': {
    css: () => require('../app/easy/vue-cli.scss'),
  },
  fanBaidu: {
    css: () => require('../app/easy/fanBaidu.scss'),
  },

  jd: {
    css: () => require('../app/easy/jd.scss'),
  },

  'ty66-down': {
    css: () => require('../styles/ty66/ty66-down.scss'),
    js: () => require('../model/ty66/ty66-down').default(),
  },
  'ty66-page': {
    css: () => require('../styles/ty66/ty66-page.scss'),
    js: () => require('../model/ty66/ty66-page').default(),
  },

  gogs: {
    css: () => require('../app/easy/gogs.scss'),
  },
  'zhihu-people': {
    css: () => require('../app/zhihu/zhihu-people.scss'),
  },
  'zhihu-question': {
    css: () => require('../app/zhihu/zhihu-question.scss'),
    js: () => require('../app/zhihu/autoImg.js').default(),
  },
  'zhihu-zhanlan': {
    css: () => require('../app/zhihu/zhihu-zhanlan.scss'),
  },
  'zhihu-zhanlan-p': {
    css: () => require('../app/zhihu/zhihu-zhanlan-p.scss'),
  },
  'zhihu-notifications': {
    css: () => require('../app/zhihu/zhihu-notifications.scss'),
  },
  'zhihu-collection': {
    css: () => require('../app/zhihu/zhihu-collection.scss'),
  },
  'zhihu-search': {
    css: () => require('../app/zhihu/zhihu-search.scss'),
  },
  zhihuHome: {
    js: () => require('../app/zhihu/index.js').default(),
    css: () => require('../app/zhihu/zhihuHome.scss'),
    load: true,
  },
  'btdax': {
    css: () => require('../app/btdx/btdx.scss'),
    js: () => require('../app/btdx/btdx.js').default(),
    load: true
  },
  'crsoso': {
    css: () => require('../app/easy/crsoso.scss'),
  },
  jianshu: {
    css: () => require('../styles/jianshu.scss'),
    js: () => require('../model/jianshu.js').default(),
  },
  jdSearch: {
    css: () => require('../app/jd/jd_search/index.scss'),
    js: () => require('../app/jd/jd_search/index.js').default(),
    load: true
  },
  movieDouban: {
    css: () => require('../styles/movieDouban.scss'),
    js: () => require('../model/movieDouban.js').default(),
    load: true
  },
  cilixiong: {
    css: () => require('../app/cilixiong/cilixiong.scss'),
    js: () => require('../app/cilixiong/cilixiong.js').default(),
    load: true
  },
  iconfont: {
    css: () => require('../app/iconfont/index.scss'),
    js: () => require('../app/iconfont/index.js').default(),
    load: true,
  },
  wuerpojie: {
    css: () => require('../app/wuerpojie/wuerpojie.scss'),
    js: () => require('../app/wuerpojie/index').default(),
    load: true
  },
  xiaozong: {
    css: () => require('../styles/xiaozong.scss'),
  },
  cssmoban: {
    css: () => require('../styles/cssmoban.scss'),
  },
  cssmoban_tag: {
    js: () => require('../model/cssmoban_tag.js').default(),
    load: true
  },
  segmentfault: {
    css: () => require('../styles/segmentfault.scss'),
  },
  engotozh: {
    js: () => require('../model/engotozh.js').default(),
  },
  googleSearch: {
    js: () => require('../app/google/index').default(),
    css: () => require('../app/google/index.scss'),
  },
  bbs3dgame: {
    js: () => require('../model/bbs3dgame.js').default(),
  },
  jbzj: {
    css: () => require('../styles/jbzj.scss'),
  },
  imooc_article: {
    css: () => require('../styles/imooc_article.scss'),
    js: () => require('../model/imooc_article.js').default(),
  },
  'job-lagou': {
    js: () => require('@/app/job/lagou').default(),
    css: () => require('@/app/job/lagou.scss'),
  },
  'job-boss': {
    js: () => require('@/app/job/boss').default(),
    css: () => require('@/app/job/boss.scss'),
  },
  'job-51job': {
    js: () => require('@/app/job/51job').default(),
    css: () => require('@/app/job/51job.scss'),
  },
  'lieping': {
    js: () => require('@/app/job/lieping').default(),
    css: () => require('@/app/job/lieping.scss'),
  },
  'zhilian': {
    js: () => require('@/app/job/zhilian').default(),
    css: () => require('@/app/job/zhilian.scss'),
  },
  'zhilian-item': {
    js: () => require('@/app/job/zhilian-item').default(),
  },
  'kuaibiancheng-arena': {
    js: () => require('@/app/easy/kuaibiancheng.js').default(),
    css: () => require('@/app/easy/kuaibiancheng.scss'),
    load: true
  },
  'jd_home': {
    js: () => require('@/app/jd/jd_home/index').default(),
    css: () => require('@/app//jd/jd_home/jd_home.scss'),
  },
  'stackoverflow': {
    js: () => require('@/app/stackoverflow/index').default(),
    css: () => require('@/app/stackoverflow/stackoverflow.scss'),
    load: true
  },
  'czbk': {
    js: () => require('@/app/czbk/index').default(),
    css: () => require('@/app/czbk/czbk.scss'),
    load: true
  },
  'copy': {
    css: () => require('@/app/easy/copy.scss'),
    load: true
  },
  'segmentfault': {
    css: () => require('@/app/segmentfault/index.scss'),
    js: () => () => require('@/app/segmentfault/index').default(),
    load: true
  },
  'manmanbuy': {
    css: () => require('@/app/easy/manmanbuy.scss'),
  },
  'lizhi-oa': {
    css: () => require('@/app/lizhi/lizhioa.js').default(),
  },
}
