import axios from 'axios'
import { get, queryToObj } from '../../utils'
import qs from 'qs'
import { set } from 'lodash'

const globalConfig = {
  pageIndex: 1,
  total: null
}

const itemHtml = function (item, data) {
  const positionId = get(item, 'positionId', '')
  const showId = get(data, 'showId', '')
  return `
    <li class="con_list_item first_row default_list">
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
        <div class="company_name">
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
      <div class="line">${get(item, 'linestaion', '无路线')}</div>
      <div class="address">${item.longitude},${item.latitude}</div>
      <span class="create-time">${item.createTime}</span>
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

export default function () {
  const ul = document.querySelector('#s_position_list .item_con_list')
  ul.innerHTML = ''
  insertData()
  window.createContent = createContent
}