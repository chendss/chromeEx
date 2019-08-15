import matchs from './matchs'
import { merge } from 'lodash'
import baseConfig from './base'
import extend_1 from './extend-1'

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

const staticConfig = function() {
  const list = [baseConfig, extend_1]
  let result = {}
  for (let con of list) {
    result = merge(result, con)
  }
  return result
}

export default merge(staticConfig(), config())
