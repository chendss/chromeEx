<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.result) {
        sendResponse({
          farewell: "ok"
        });
      }
    })
  }
}
</script>