module.exports = {
  name: '还互联网一片净土',
  version: '1.0.0',
  description: '还互联网一片净土',
  author: '',
  manifest_version: 2,
  ids: ['dashaoye112233'],
  icons: {
    '16': 'icons/main.png',
    '48': 'icons/main.png',
    '128': 'icons/main.png',
  },
  permissions: [
    '*://*/',
    'storage',
    'contextMenus',
    'clipboardWrite',
    'clipboardRead',
    'webRequest',
    'webRequestBlocking',
    'tabs',
    '<all_urls>',
  ],
  browser_action: {
    default_icon: {
      '19': 'icons/main.png',
      '38': 'icons/main.png',
      '128': 'icons/main.png',
    },
    default_title: '还互联网一片净土',
    default_popup: 'pages/popup.html',
  },
  background: {
    persistent: true,
    scripts: ['js/background.js'],
  },
  // devtools_page: 'pages/devtools.html',
  background_page: "pages/background.html",
  options_page: 'pages/options.html',
  content_scripts: [
    {
      js: ['js/inject.js'],
      run_at: 'document_start',
      matches: ['<all_urls>'],
      all_frames: false,
    },
  ],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [
    'js/content.js',
    'lulu.js',
    'bootstrap.js',
    'bootstrap-select.js',
    'modal.css',
    'lulu.css',
    'global.css',
    'animate.css',
    'bootstrap.css',
    'bootstrap-select.css'
  ],
}
