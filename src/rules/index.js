import matchs from './matchs'
import { merge } from 'lodash'

let baseConfig = {
  ip: {
    js: () => require('../model/ip').default(),
    css: () => require('../styles/ip.scss'),
    load: true,
  },
  auto: {
    js: () => require('../model/auto').default(),
  },
  cto: {
    js: () => require('../model/cto').default(),
    css: () => require('../styles/cto51.scss'),
  },
  nga: {
    js: () => require('../model/nga').default(),
    load: true,
  },
  imooc: {
    css: () => require('../styles/imooc.scss'),
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

const config = function() {
  let result = {}
  const keys = Object.keys(baseConfig)
  Object.entries(matchs).forEach(match => {
    const [key, value] = match
    if (keys.includes(key)) {
      result[key] = {
        matchs: value,
      }
    }
  })
  return result
}
export default merge(baseConfig, config())
