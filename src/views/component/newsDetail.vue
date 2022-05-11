<template>
  <div class='detail'>
    <el-card class='detail-publish'>
      <div class='detail-publish-body'>
        <div class='bottom' v-html='content'></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    this.content = this.$route.query.content
    this.content = this.content.replace(/\/profile/g, 'http://120.25.173.28:8080/profile').replace(/\/dev-api/g, '')
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/index.scss';

.detail {
  &-publish {
    text-align: left;
    @include ml;
    @include width;
    margin-bottom: 20px;
    
    &-body {
      padding: 14px;
      
      .bottom {
        margin-top: 20px;
        width: 100%;
        /* 保证 html 代码中的 img 不能超过边界 */
        ::v-deep img {
          width: 100%;
        }
      }
    }
  }
}
</style>
