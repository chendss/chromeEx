import { queryToObj } from "@/utils"

export default function () {
  const search = queryToObj()
  if (search.toudi === true) {
    const k = setInterval(() => {
      const btn = document.querySelector('#root .job-summary .summary-plane__right .a-job-apply-button.summary-plane__action button')
      if (btn != null) {
        btn.click()
        clearInterval(k)
      }
    }, 500)
  }
}