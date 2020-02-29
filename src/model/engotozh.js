export default function () {
  var skiplist = [
    ['/api.jquery.com/', '/www.jquery123.com/'],
    ['/www.php.net/manual/en/', '/www.php.net/manual/zh/'],
    ['/developer.mozilla.org/en-US/', '/developer.mozilla.org/zh-CN/'],
    ['/eslint.org/', '/eslint.cn/'],
  ]

  /*=======  edit  your  site =========*/
  var href = window.location.href;
  function skip (source, target) {
    if (href.indexOf(source) != -1) {
      href = href.replace(source, target);
      window.location.href = href;
    }
  }
  for (var i = 0; i < skiplist.length; i++) {
    skip(skiplist[i][0], skiplist[i][1])
  }
}