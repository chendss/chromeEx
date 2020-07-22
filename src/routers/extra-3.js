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
    js: () => require('@/app/kuaibiancheng/index').default(),
    css: () => require('@/app/kuaibiancheng/kuaibiancheng.scss'),
    load: true
  },
  'jd_home': {
    js: () => require('@/app/jd_home/index').default(),
    css: () => require('@/app/jd_home/jd_home.scss'),
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
    css: () => require('@/app/copy/copy.scss'),
    load: true
  },
  'segmentfault': {
    css: () => require('@/app/segmentfault/index.scss'),
    js: () => () => require('@/app/segmentfault/index').default(),
    load: true
  },
}