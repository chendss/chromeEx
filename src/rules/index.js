import matchs from './matchs'
import { merge } from '../code/lodash'

const baseConfig = {
  ip: {
    js: () => require('../model/ip').default(),
    css: () => require('../styles/ip.scss'),
    load: true,
  },
  auto: {
    js: () => require('../model/auto').default(),
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
