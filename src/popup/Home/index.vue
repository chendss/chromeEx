<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="home">
    <Dropdown :hide-timeout="15000">
      <Button>功能按钮</Button>
      <DropdownMenu slot="dropdown">
        <DropdownItem @click="clear">清空缓存</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { Button, Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import { clearCookies } from '../utils'

export default {
  components: { Button, Dropdown, DropdownItem, DropdownMenu },
  methods: {
    async clear() {
      await clearCookies()
      chrome.tabs.sendMessage(that.id, '清空缓存去', (...args) => {
        console.log('..相应', ...args)
      })
    },
  },
}
</script>
