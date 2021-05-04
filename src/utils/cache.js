import md5 from 'js-md5'
import dayjs from 'dayjs'
import local from 'localforage'
import { getType, getOnlyId, toArray } from './tools'
import { set, get, isEqual, remove } from 'lodash'


local.config({ name: 'data_cache' })

export class CacheControl {

  constructor(config) {
    config && local.config(config)
    this.subscribeDict = {}
    this.onlyId = ''
    this.functionList = {}
  }

  static new (config) {
    const c = new this(config)
    return c
  }

  /**
   * 仅当缓存函数具备主动传入的函数id时可用，更新缓存函数，此函数会将该函数的缓存清除
   *
   * @memberof CacheControl
   */
  update = async (functionId) => {
    const taskList = toArray(functionId).map(async (fId) => {
      const onlyId = await this.getOnlyId()
      const saveKey = fId + onlyId
      await local.setItem(saveKey, {})
    })
    await Promise.all(taskList)
  }

  /**
   * 解构此函数,得到未被加工的函数与函数id
   *
   * @memberof CacheControl
   */
  deconstruction = (fn) => {
    const f = typeof fn === 'string' ? this.functionList[fn] : fn
    const fnKey = Symbol.for('handle')
    const funId = Symbol.for('funId')
    const functionId = get(f, funId, '')
    const handle = get(f, fnKey, null)
    return { functionId, handle }
  }

  getOnlyId = async () => {
    if (this.onlyId) {
      return this.onlyId
    }
    const onlyId = await getOnlyId()
    this.onlyId = onlyId
    return onlyId
  }

  paramsKey = (params) => {
    if (params == null) {
      return { noParams: 'noParams' }
    }
    return params
  }

  get = async (key) => {
    const result = await local.getItem(key)
    const r = result
    return r
  }

  save = (key, value) => {
    return local.setItem(key, value)
  }

  /**
   * 通知订阅中心
   *
   * @memberof CacheControl
   */
  emitFun = (functionId, res, params) => {
    const fnArray = get(this.subscribeDict, functionId, [])
    setTimeout(() => {
      Promise.all(fnArray.map((fn) => fn(params, res)))
    })
  }

  /**
   * 从本地缓存取出需要的值
   *
   * @memberof CacheControl
   */
  getLocalInfo = (localValue) => {
    const time = get(localValue, 'time', dayjs('1995-01-01').valueOf())
    const localRes = get(localValue, 'res', null)
    const old = dayjs(time)
    const now = dayjs()
    const isExpired = now.diff(old, 'second') <= 0
    const result = { isExpired, localRes }
    return result
  }

  /**
   * 缓存刷新
   *
   * @template T 参数泛型
   * @template K 返回值泛型
   * @param {(T | undefined)} params 参数
   * @param {Fn<K>} fn 函数体
   * @param {string} saveKey 保存到数据库的key
   * @param {CacheOptions} options 可选配置
   * @returns
   * @memberof CacheControl
   */
  async refreshLocal (params, fn, saveKey, options) {
    const res = await fn(params)
    const localValueDict = (await local.getItem(saveKey)) || {}
    const localKey = Object.keys(localValueDict).find((key) => isEqual(this.paramsKey(params), JSON.parse(key)))
    const { expiredTime } = options
    if (localKey) {
      localValueDict[localKey] = { res, createTime: dayjs().valueOf(), expiredTime }
      local.setItem(saveKey, localValueDict)
      return res
    } else {
      const paramsKey = JSON.stringify(params || this.paramsKey(params))
      localValueDict[paramsKey] = { res, createTime: dayjs().valueOf(), expiredTime }
      local.setItem(saveKey, localValueDict)
    }
    return res
  }

  /**
   * 设置函数的隐藏属性
   *
   * @memberof CacheControl
   */
  setSymbolProperty = (obj) => {
    const t = getType(obj)
    let result = obj
    const symbolKey = Symbol.for('cache')
    if (['Null', 'NaN', 'Undefined'].some((s) => t === s)) {
      return obj
    } else if (t === 'Number') {
      result = new Number(obj)
    } else if (t === 'String') {
      result = new String(obj)
    }
    set(result, symbolKey, 'cache')
    return result
  }

  /**
   * 当缓存值存在时
   *
   * @memberof CacheControl
   */
  async valueDictHandle (
    dict,
    params,
    fn,
    saveKey,
    options,
  ) {
    const localValueDict = { ...dict }
    const localKey = Object.keys(localValueDict).find((key) => isEqual(this.paramsKey(params), JSON.parse(key)))
    const { activeUpdate = false } = options
    if (localKey) {
      // 表示缓存值存在,需要进一步判断是否过期
      const { isExpired, localRes } = this.getLocalInfo(localValueDict[localKey])
      if (isExpired) {
        const res = await this.refreshLocal(params, fn, saveKey, options)
        return res
      } else {
        activeUpdate && this.refreshLocal(params, fn, saveKey, options)
        const result = this.setSymbolProperty(localRes)
        return result
      }
    } else {
      const res = await this.refreshLocal(params, fn, saveKey, options)
      return res
    }
  }

  /**
   * 缓存函数的包装方法
   *
   * 1.参数生成参数key
   * 2.判断缓存是否存在 存在则判断参数是否对应
   * 3.如果对应则返回缓存，如果不对应则存储起来
   * 4.如果过期则重新存储这个值
   * 5.发起推送到订阅
   *
   * @param {Fn<K>} fn
   * @param {string} [id]
   * @memberof CacheControl
   */
  cacheFun = (fn, options = {}) => {
    const { id } = options
    const functionId = id || md5(fn.toString())
    const handle = async (params) => {
      const noCache = get(params, 'noCache', false)
      if (noCache) {
        const res = await fn(params)
        return res
      } else {
        const onlyId = await this.getOnlyId()
        const saveKey = functionId + onlyId
        const localValueDict = await local.getItem(saveKey)
        if (localValueDict) {
          const res = await this.valueDictHandle(localValueDict, params, fn, saveKey, options)
          this.emitFun(functionId, res, params)
          return res
        } else {
          const res = await this.refreshLocal(params, fn, saveKey, options)
          this.emitFun(functionId, res, params)
          return res
        }
      }
    }
    const fnKey = Symbol.for('handle')
    const funId = Symbol.for('funId')
    set(handle, fnKey, fn) //    记录函数的原始体 TODO: 由于ts里暂时没有处理symbol作为索引的方案，这里绕过去
    set(handle, funId, functionId) //    记录函数的id  TODO: 由于ts里暂时没有处理symbol作为索引的方案，这里绕过去
    this.functionList[functionId] = handle
    return handle
  }

  /**
   * 订阅某个被cache过的函数，每当函数调用则会触发此订阅
   *
   * @param {Fn<void>} fn
   * @memberof CacheControl
   */
  subscribe = (fn, cbk) => {
    const funId = Symbol.for('funId')
    if (!funId) {
      console.assert('请先使用cache函数包裹此函数再使用')
    } else {
      const id = get(fn, funId, '')
      if (!(id in this.subscribeDict)) {
        this.subscribeDict[id] = []
      }
      const fnArray = get(this.subscribeDict, id, [])
      fnArray.push(cbk)
    }
  }

  /**
   * 取消订阅某函数
   *
   * @memberof CacheControl
   */
  unSubscribe = (fn, cbk) => {
    const funId = Symbol.for('funId')
    if (!funId) {
      console.assert('请先使用cache函数包裹此函数再使用')
    } else {
      const id = get(fn, funId, '')
      const fnArray = get(this.subscribeDict, id, [])
      remove(fnArray, cbk)
      fnArray.push(cbk)
    }
  }
}

const c = CacheControl.new()

export const cache = c.cacheFun

export const updateCache = c.update

export const subscribe = c.subscribe

export const unSubscribe = c.unSubscribe

export default c
