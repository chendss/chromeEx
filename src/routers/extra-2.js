export default {
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
    css: () => require('../styles/btdx.scss'),
    js: () => require('../model/btdx.js').default(),
    load: true
  },
  'crsoso': {
    css: () => require('../styles/crsoso.scss'),
  },
  jianshu: {
    css: () => require('../styles/jianshu.scss'),
    js: () => require('../model/jianshu.js').default(),
  },
  jdSearch: {
    css: () => require('../styles/jdSearch.scss'),
    js: () => require('../model/jdSearch.js').default(),
    load: true
  },
  movieDouban: {
    css: () => require('../styles/movieDouban.scss'),
    js: () => require('../model/movieDouban.js').default(),
    load: true
  },
  cilixiong: {
    css: () => require('../styles/cilixiong.scss'),
    js: () => require('../model/cilixiong.js').default(),
    load: true
  },
  iconfont: {
    css: () => require('../app/iconfont/index.scss'),
    js: () => require('../app/iconfont/index.js').default(),
    load: true,
  },
  wuerpojie: {
    css: () => require('../styles/wuerpojie.scss'),
    js: () => require('../model/wuerpojie/index').default(),
    load: true
  },
}
