import matchs from './matchs'
import { merge } from 'lodash'
import baseConfig from './base'

const config = function () {
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

const result = merge(baseConfig, config())
export default result
