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
}
