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
}
