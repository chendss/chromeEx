import matchs from './matchs'
import { merge } from 'lodash'
import baseConfig from './base'
import extend_1 from './extend-1'

const mergeConfig = {
  ...baseConfig,
  ...extend_1,
}

const config = function() {
  let result = {}
  const keys = Object.keys(mergeConfig)
  Object.entries(matchs).forEach(match => {
    const [key, value] = match
    if (keys.includes(key)) {
      result[key] = {
        matchs: value,
      }
    }
  })
  console.log('规则生成', result)
  return result
}

export default merge(mergeConfig, config())
