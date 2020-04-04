import './index.scss'
import { get, merge } from 'lodash'

const baseDict = function (parent) {
  const parents = [...parent.querySelectorAll(`._search_fitler .filter-row`)]
  let result = {}
  parents.forEach((row, i) => {
    let key = row.getAttribute('key')
    result[key] = null
    result[key + '_sort'] = -1
  })
  return result
}

class SearchFilter {
  constructor(props) {
    this.props = props
    const { selector } = this.props
    this.selector = selector
    this.parent = document.querySelector(selector)
    this.rows = [...this.parent.querySelectorAll('._search_fitler .filter-row')]
    this.values = baseDict(this.parent)
  }

  static new (props) {
    const searchObj = new this(props)
    searchObj.init()
    searchObj.bindEvent()
    return searchObj
  }

  init () {
    const keys = Object.keys(this.values)
    for (let key of keys) {
      let value = null
      if (key.includes('_sort')) {
        value = -1
      }
      Object.defineProperty(this.values, key, {
        get: () => value,
        set: (val) => {
          value = val
          get(this.props, 'onChange', () => { })(key, val, this.values)
        }
      })
    }
  }
  bindSortClick () {
    const rows = this.rows
    rows.forEach(row => {
      const tags = [...row.querySelectorAll('.tags .cy_tag')]
      const parentTag = row.querySelector('.tags')
      parentTag.addEventListener('click', event => {
        if (parentTag === event.target) return
        const target = event.target
        const value = target.getAttribute('value')
        tags.forEach(tag => tag.setAttribute('type', ''))
        target.setAttribute('type', 'p')
      })
    })
  }

  bindEvent () {
    this.bindSortClick()
  }
}

window.searchObj = SearchFilter.new({ selector: 'body' })

if (module.hot) {
  module.hot.accept()
}