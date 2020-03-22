export default {
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
    js: () => require('../model/googleSearch.js').default(),
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
    js: () => require('../model/job/lagou.js').default(),
    css: () => require('../styles/job/lagou.scss'),
  },
}