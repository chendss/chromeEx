export default {
  ip: {
    js: () => require('../model/ip').default(),
    css: () => require('../styles/ip.scss'),
    load: true,
  },
  global: {
    js: () => require('../model/global').default(),
  },
  auto: {
    js: () => require('../model/auto').default(),
  },
  cto: {
    js: () => require('../model/cto').default(),
    css: () => require('../styles/cto51.scss'),
    load: true,
  },
  nga: {
    js: () => require('../model/nga').default(),
    load: true,
  },
  imooc: {
    css: () => require('../styles/imooc.scss'),
  },
  youdao: {
    css: () => require('../styles/youdao.scss'),
  },
  baidu: {
    js: () => require('../model/baidu').default(),
    css: () => require('../styles/baidu.scss'),
    load: true,
  },
  zhihu: {
    js: () => require('../model/zhihu').default(),
    css: () => require('../styles/zhihu.scss'),
    load: true,
  },
  clearCopy: {
    js: () => require('../model/clearCopy').default(),
  },
}
