export default {
  ruan: {
    js: () => require('../app/ruan').default(),
    css: () => require('../app/ruan/index.scss'),
    load: true,
  },
  wenku: {
    js: () => require('../model/wenku').default(),
    css: () => require('../styles/wenku.scss'),
    load: true,
  },
  csdn: {
    css: () => require('../styles/csdn.scss'),
    js: () => require('../model/csdn.js').default(),
  },

  'vue-cli': {
    css: () => require('../styles/vue-cli.scss'),
  },
  fanBaidu: {
    css: () => require('../styles/fanBaidu.scss'),
  },

  jd: {
    css: () => require('../styles/jd.scss'),
  },

  'ty66-down': {
    css: () => require('../styles/ty66/ty66-down.scss'),
    js: () => require('../model/ty66/ty66-down').default(),
    load: true,
  },
  'ty66-page': {
    css: () => require('../styles/ty66/ty66-page.scss'),
    js: () => require('../model/ty66/ty66-page').default(),
    load: true,
  },

  gogs: {
    css: () => require('../styles/gogs.scss'),
  },
}
