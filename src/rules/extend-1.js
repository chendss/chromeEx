export default {
  ruan: {
    js: () => require('../model/ruan').default(),
    css: () => require('../styles/ruan.scss'),
    load: true,
  },
  wenku: {
    js: () => require('../model/wenku').default(),
    css: () => require('../styles/wenku.scss'),
    load: true,
  },
  csdn: {
    css: () => require('../styles/csdn.scss'),
  },
  avgle: {
    css: () => require('../styles/avgle.scss'),
    js: () => require('../model/avgle').default(),
    load: true,
  },
  'vue-cli': {
    css: () => require('../styles/vue-cli.scss'),
  },
  fanBaidu: {
    css: () => require('../styles/fanBaidu.scss'),
  },
  avgle_item: {
    css: () => require('../styles/avgle_item.scss'),
    js: () => require('../model/avgle_item').default(),
    load: true,
  },
  jd: {
    css: () => require('../styles/jd.scss'),
  },
  'zhihu-search': {
    css: () => require('../styles/zhihu-search.scss'),
  },
  'ty66-down': {
    css: () => require('../styles/ty66-down.scss'),
    js: () => require('../model/ty66-down.js').default(),
    load: true,
  },
  'ty66-page': {
    css: () => require('../styles/ty66-page.scss'),
    js: () => require('../model/ty66-page.js').default(),
    load: true,
  },
  '89File': {
    css: () => require('../styles/89FileDown.scss'),
    js: () => require('../model/89File.js').default(),
    load: true,
  },
  '89FileDown': {
    css: () => require('../styles/89FileDown.scss'),
    js: () => require('../model/89FileDown.js').default(),
    load: true,
  },
  gogs: {
    css: () => require('../styles/gogs.scss'),
  },
}
