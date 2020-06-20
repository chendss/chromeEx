/**
 * 阮一峰
 *
 * @export
 */
export default function () {
  let a = document.createElement('a'),
    img = document.createElement('img')
  img.setAttribute('src', 'about:blank;?wangbase.com/blogimg/asset/')
  a.appendChild(img)
  document.body.appendChild(a)
}
