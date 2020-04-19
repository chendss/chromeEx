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
}