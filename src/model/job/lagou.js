import qs from 'qs'
import axios from 'axios'
import { set } from 'lodash'
import Custom from '../../assets/custom'
import { get, queryToObj } from '../../utils'

const globalConfig = {
  pageIndex: 1,
  total: null
}

const priceDict = function () {
  const list = ['0-不限', ... new Array(22).fill('0')].map((_, index) => `${index + 3}-${index + 3}k以上`)
  return list
}

const 工资筛选 = function () {
  const list = priceDict()
  const li = list.map(item => {
    const [price, text] = item.split('-')
    return `<li><a rel="nofollow" href="javascript:;" onclick="changePrice(${Number(price)})">${text}</a></li>`
  })
  return `<ul>${li.join('\n')}</ul>`
}

const itemHtml = function (item, data) {
  const positionId = get(item, 'positionId', '')
  const showId = get(data, 'showId', '')
  const priceList = get(item, 'salary', '').split('-').map(p => Number(p.replace('k', '')))
  return `
    <li class="con_list_item first_row default_list my-item" price="${priceList.join('-')}">
    <span class="top_icon direct_recruitment"></span>
    <div class="list_item_top">
      <div class="position">
        <div class="p_top">
          <a class="position_link" href="https://www.lagou.com/jobs/${positionId}.html?show=${showId}" target="_blank">
            <h3 style="max-width: 180px;">${item.positionName}</h3>
            <span class="add">[<em>${item.district}</em>]</span>
          </a>
          <span class="format-time">${item.formatCreateTime}</span>
          <div class="chat_me"></div>
        </div>
        <div class="p_bot">
          <div class="li_b_l">
            <span class="money">${item.salary}</span>
            <!--<i></i>-->${item.workYear} / ${item.education} / ${item.jobNature}
          </div>
        </div>
      </div>
      <div class="company">
        <div class="company_name" title="${item.companyFullName}">
          <a href="https://www.lagou.com/gongsi/${item.companyId}.html" target="_blank">${item.companyFullName}</a
          ><i class="company_mark"><span>该企业已上传营业执照并通过资质验证审核</span></i>
        </div>
        <div class="industry">
          ${item.industryField} / ${item.financeStage} / ${item.companySize}
        </div>
      </div>
      <div class="com_logo">
        <a href="https://www.lagou.com/gongsi/${item.companyId}.html" target="_blank">
          <img
            src="//www.lgstatic.com/thumbnail_120x120/${item.companyLogo}"
            alt="${item.positionName}"
            width="60"
            height="60"
          />
        </a>
      </div>
    </div>
    <div class="list_item_bot">
      <div class="li_b_l">
      ${[item.secondType, ...get(item, 'skillLables', [])].map(label => (`<span>${label}</span>`)).join('\n')}
        <span>${item.secondType} </span>
      </div>
      <div class="li_b_r">“${item.positionAdvantage}”</div>
    </div>
    <div class="postation">
      <div class="line p-row">
        落点处：
        ${get(item, 'linestaion', '无路线').split(';').map(l => (`<span title="${l}">${l}</span>`)).join('\n')}
      </div>
      <div class="address p-row">经纬度：${item.longitude},${item.latitude}</div>
      <span class="create-time p-row">发布时间：${item.createTime}</span>
      <div class="chuiniu p-row">
        公司标签：
        ${get(item, 'companyLabelList', []).map(lable => (`<span title="${lable}">${lable}</span>`)).join('\n')}
      </div>
      </div>
  </li>
`
}

const searchText = function () {
  const href = decodeURIComponent(window.location.href)
  const listStr = href.split('//')[1].split('/').find(l => l.includes('list_'))
  const text = listStr.split('_')[1]
  return text
}

const pageDataConfig = function () {
  const url = 'https://www.lagou.com/jobs/positionAjax.json'
  const config = {
    params: {
      city: '广州',
      needAddtionalResult: false,
      ...queryToObj(),
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  const requestData = qs.stringify({
    first: true,
    kd: searchText(),
    pn: globalConfig.pageIndex,
  })
  const param = [url, requestData, config]
  return param
}

const resultDataAction = function (res) {
  const content = get(res, 'data.content', {})
  const data = get(content, 'positionResult', {})
  const pageNo = get(content, 'pageNo', 1)
  globalConfig.pageIndex = pageNo + 1
  const total = get(data, 'totalCount', 1)
  const totalPageSize = Math.ceil(total / get(data, 'resultSize', 15))
  set(globalConfig, 'total', totalPageSize)
  set(data, 'showId', get(res, 'data.showId', ''))
  set(data, 'totalPageSize', totalPageSize)
  set(data, 'pageNo', pageNo)
  return data
}

const insertHtml = function (list, data) {
  const ul = document.querySelector('#s_position_list .item_con_list')
  let html = list.map(item => itemHtml(item, data))
  ul.insertAdjacentHTML('beforeend', html.join('\n'))
  const li = ul.querySelectorAll('li')
  li.forEach(item => {
    if (!item.classList.contains('my-item')) {
      item.remove()
    }
  })
}

const createContent = async function () {
  if (globalConfig.total != null && globalConfig.pageIndex >= globalConfig.total) {
    return
  }
  const res = await axios.post(...pageDataConfig())
  const data = resultDataAction(res)
  const list = get(data, 'result', [])
  insertHtml(list, data)
}

const insertData = function () {
  const k = setInterval(async () => {
    if (globalConfig.total != null && globalConfig.pageIndex >= globalConfig.total) {
      clearInterval(k)
    } else {
      createContent()
    }
  }, 1.5 * 1000)
}

const changePrice = function (price) {
  const textDom = document.querySelector('#order .item.salary.selectUI .selectUI-text.text>span')
  const list = document.querySelectorAll('.my-item')
  const priceList = priceDict()
  const text = priceList.find(item => item.split('-')[0] === price + '').split('-')[1]
  textDom.innerHTML = text
  list.forEach(item => {
    const minPrice = item.getAttribute('price').split('-')[0]
    if (Number(minPrice) < price) {
      item.classList.add('none')
    } else {
      item.classList.remove('none')
    }
  })
}

export default function () {
  const ul = document.querySelector('#s_position_list .item_con_list')
  ul.innerHTML = ''
  insertData()
  window.createContent = createContent
  window.changePrice = changePrice
  const drop = document.querySelector('#order .item.salary.selectUI .selectUI-text.text ul')
  drop.innerHTML = 工资筛选()
}