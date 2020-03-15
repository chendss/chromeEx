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
  'job-lagou': {
    js: () => require('../model/job/lagou.js').default(),
    css: () => require('../styles/job/lagou.scss'),
  },
}