<template>
  <div id="app">
    <menu-tab-header />
    <!-- 添加 key，防止相同组件滞留 -->
    <router-view :key="new Date().getTime() + Math.random() * 100000" />
  </div>
</template>

<script>
import MenuTabHeader from '@/components/MenuTab'
export default {
  components: { MenuTabHeader }
}
</script>
