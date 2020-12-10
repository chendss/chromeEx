export default function () {
  const m = document.querySelector('#SFUserId')
  if (m == null) {
    document.head.insertAdjacentHTML('beforeend', '<meta name="userId" value="233" id="SFUserId">')
  }
}