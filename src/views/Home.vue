<template>
  <div class="home">
    <!-- 地图 -->
    <map-china />
  </div>
</template>

<script>
import MapChina from '@/components/Map3'
export default {
  components: {
    MapChina
  }
}
</script>

<style lang="scss" scoped>
.home {
  /* 可以在这里添加背景图 */
  overflow: hidden;
  height: calc(100vh - 90px);
  width: 99vw;
}
</style>
