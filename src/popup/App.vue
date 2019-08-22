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
    chrome.runtime.sendMessage({ greeting: 'Hello' }, (response) => {
      console.log(response, '复杂')
    })
  }
}
</script>