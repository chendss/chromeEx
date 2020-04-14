import { openLoading, closeLoading } from "@/utils"
import { q, e } from "@/utils/tools"
import GMap from '@/common/Map'
import SearchFilter from './searchFilter'

const globalConfig = {}
const globalStore = {}

const pageConfig = function () {
  const rtPrev = q('#rtPrev')
  const parent = rtPrev.parentElement
  const list = parent.innerText.split('/').map(str => Number(str.replace(/\s*/g, "")))
  const [index, total] = list
  return { index, total }
}

const onConfirm = function (data, ul) {

}

const batchClick = function (ul) {

}

const insertData = async function () {

}

// https://search.51job.com/list/030200,000000,0000,00,9,99,亚马逊+运营,2,3.html?lang=c&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&ord_field=0&dibiaoid=0&line=&welfare=

export default async function () {
  openLoading()
  const ul = q('#resultList')
  globalConfig.map = await GMap.new('body')
  globalConfig.searchFilter = SearchFilter.new({
    selector: '.dw_filter',
    onConfirm: (data) => onConfirm(data, ul),
    batchClick: (data) => batchClick(ul),
  })
  await insertData()
  closeLoading()
}