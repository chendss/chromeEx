export default {
  xiaozong: {
    css: () => require('../styles/xiaozong.scss'),
    // js: () => require('../model/btdx.js').default(),
    // load: true
  },
  segmentfault: {
    css: () => require('../styles/segmentfault.scss'),
    // js: () => require('../model/btdx.js').default(),
    // load: true
  },
  engotozh: {
    js: () => require('../model/engotozh.js').default(),
    // load: true
  },
}