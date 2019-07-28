module.exports = {
  name: '还互联网一片净土',
  version: '1.0.0',
  description: '还互联网一片净土',
  author: '',
  manifest_version: 2,
  icons: {
    '16': 'icons/main.png',
    '48': 'icons/main.png',
    '128': 'icons/main.png',
  },
  permissions: ['*://*/', 'storage', 'contextMenus', 'clipboardWrite', 'clipboardRead'],
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
    persistent: false,
    scripts: ['js/background.js'],
  },
  // devtools_page: 'pages/devtools.html',
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
  web_accessible_resources: ['js/content.js'],
}
