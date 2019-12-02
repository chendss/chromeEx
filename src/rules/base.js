export default {
  ip: {
    css: () => require('../styles/ip.scss'),
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
  zhihuHome: {
    js: () => require('../model/zhihu').default(),
    css: () => require('../styles/zhihu/zhihuHome.scss'),
    load: true,
  },
  qrCode: {
    js: () => require('../model/qrCode').default(),
    css: () => { },
    load: true,
  },
}
