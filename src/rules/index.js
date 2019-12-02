import matchs from './matchs'
import { merge } from 'lodash'
import baseConfig from './base'
import extra_1 from './extra-1'
import extra_2 from './extra-2'

const mergeConfig = {
  ...baseConfig,
  ...extra_1,
  ...extra_2,
}

const config = function () {
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
  return result
}

const result = merge(mergeConfig, config())
export default result
