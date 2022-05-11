<template>
  <div class="search-body">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <h3 style="width: 100%">
          <img :src="item.url" alt="img" height="100%" width="100%" />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ['bannerList']
}
</script>

<style lang="scss" scoped>
.search-body {
  margin: 0 10vw;
}
</style>
