export default {
  'zhihu-people': {
    css: () => require('../styles/zhihu/zhihu-people.scss'),
  },
  'zhihu-question': {
    css: () => require('../styles/zhihu/zhihu-question.scss'),
  },
  'zhihu-zhanlan': {
    css: () => require('../styles/zhihu/zhihu-zhanlan.scss'),
  },
  'zhihu-zhanlan-p': {
    css: () => require('../styles/zhihu/zhihu-zhanlan-p.scss'),
  },
  'btdax': {
    css: () => require('../styles/btdx.scss'),
    js: () => require('../model/btdx.js').default(),
    load: true
  }
}
