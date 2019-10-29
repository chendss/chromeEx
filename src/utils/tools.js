import { get } from 'lodash'

export const toArray = function(source) {
  let result = []
  if (source instanceof Array) {
    result = source
  } else {
    result = [source]
  }
  return result.filter(f => !['', null, undefined].includes(f))
}
