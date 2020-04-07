import './index.scss'
import { get, strFormat } from '@/utils'
import Html from './index.html'
import { set, cloneDeep } from 'lodash'
import { es, q, e, toArray } from '@/utils/tools'

const forEachPanel = function (panels, callback) {
  panels.forEach((panel, i) => {
    let key = panel.getAttribute('key')
    const rows = es(panel, '.content_row')
    rows.forEach(row => {
      const rowKey = row.getAttribute('key')
      callback({ key, rowKey, panel, row })
    })
  })
}

const baseDict = function (panels) {
  let result = {}
  forEachPanel(panels, ({ key, rowKey }) => {
    set(result, `${key}.${rowKey}`, null)
  })
  return result
}

class SearchFilter {
  constructor(props) {
    this.props = props
    const { selector, extra = {} } = this.props
    this.selector = selector
    this.parent = q(selector)
    this.parent.innerHTML = strFormat(Html['content'], {
      ...extra
    })
    this.filterRows = es(this.parent, '._search_fitler .filter-row')
    this.panels = es(this.parent, '._search_filter_box .cy_panel')
    this.stateCopy = baseDict(this.panels)
    this.state = baseDict(this.panels)
  }

  static new (props) {
    const searchObj = new this(props)
    searchObj.watch()
    searchObj.bindEvent()
    return searchObj
  }

  render (key, value) {
    const panel = e(this.parent, `.cy_panel[key="${key}"]`)
    for (let itemKey of Object.keys(value)) {
      const val = value[itemKey]
      const tags = es(panel, `.content_row[key="${itemKey}"] .tags .cy_tag`)
      tags.forEach(tag => tag.setAttribute('type', ''))
      if (val != null) {
        const tag = tags.find(tag => tag.getAttribute('value') === JSON.stringify(val))
        if (tag != null) {
          tag.setAttribute('type', 'p')
        }
      }
    }
  }

  stateWatch (key) {
    let value = this.stateCopy[key]
    Object.defineProperty(this.state, key, {
      get: () => value,
      set: (val) => {
        value = val
        this.render(key, value)
        get(this.props, 'onChange', () => { })(key, val, this.state)
      }
    })
  }

  watch () {
    const keys = Object.keys(this.stateCopy)
    for (let key of keys) {
      this.stateWatch(key)
    }
  }

  bindInputConfirm (btn, row, key, rowKey) {
    btn.addEventListener('click', event => {
      const target = event.target
      const inputs = es(row, '.cy_input')
      let values = this.state[key]
      if (get(inputs, 'length', 1) >= 2) {
        const inputValues = inputs.map(input => input.getAttribute('value'))
        if (inputValues.every(i => i == null)) {
          values[rowKey] = null
        } else {
          values[rowKey] = inputValues
        }
      } else {
        values[rowKey] = get(inputs, '[0]').getAttribute('value')
      }
      this.state[key] = values
    })
  }

  inputFormTag (key, row, targetValues) {
    if (key === 'sort') return
    const inputs = es(row, '.cy_input')
    const vals = toArray(targetValues)
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      input.setAttribute('value', get(vals, `[${i}]`, null))
    }
  }

  bindTag (tags, key, row, rowKey) {
    tags.addEventListener('click', event => {
      const target = event.target
      if (target === tags) return
      if (target.classList.contains('least')) {
        this.state[key].type = null
      } else if (target.classList.contains('indicators')) {
        this.state[key].comprehensive = null
      }
      const values = this.stateCopy[key]
      const targetValues = JSON.parse(target.getAttribute('value'))
      values[rowKey] = targetValues
      this.state[key] = values
      this.inputFormTag(key, row, targetValues)
    })
  }

  bindEvent () {
    const panels = this.panels
    forEachPanel(panels, ({ key, rowKey, panel, row }) => {
      const tags = e(row, '.tags')
      this.bindTag(tags, key, row, rowKey)
      if (key !== 'sort') {
        const btn = e(row, '.cy_btn')
        this.bindInputConfirm(btn, row, key, rowKey)
      }
    })
    const btn = e(this.parent, '.confirm')
    btn.addEventListener('click', () => {
      get(this.props, 'onConfirm', () => { })(this.stateCopy)
    })
  }
}

export default SearchFilter