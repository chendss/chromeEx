export default {
  'zhihu-people': {
    css: () => require('../styles/zhihu/zhihu-people.scss'),
  },
  'zhihu-question': {
    css: () => require('../styles/zhihu/zhihu-question.scss'),
    js: () => require('../model/zhihu/zhihu-question.js').default(),
  },
  'zhihu-zhanlan': {
    css: () => require('../styles/zhihu/zhihu-zhanlan.scss'),
  },
  'zhihu-zhanlan-p': {
    css: () => require('../styles/zhihu/zhihu-zhanlan-p.scss'),
  },
  'zhihu-notifications': {
    css: () => require('../styles/zhihu/zhihu-notifications.scss'),
  },
  'zhihu-collection': {
    css: () => require('../styles/zhihu/zhihu-collection.scss'),
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
