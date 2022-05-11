<template>
  <div class='menu-tab'>
    <!-- 菜单栏 -->
    <div class='menu-tab-body'>
      <!-- 左侧菜单 -->
      <menu-tab-item :list='menuLeft' @handleTabClick='handleTabClick' />
      <!-- 项目标题 -->
      <span class='title' @click="$router.push('/')">{{ title }}</span>
      <!-- 右侧菜单 -->
      <menu-tab-item :list='menuRight' @handleTabClick='handleTabClick' />
    </div>
  </div>
</template>

<script>
import MenuTabItem from '@/components/MenuTabItem.vue'
// import { getToken } from '@/utils/auth'
export default {
  components: {
    MenuTabItem
  },
  data() {
    return {
      menuLeft: [
        { id: '1', name: '数据视图', code: 'dataMap', to: '/home', auth: true },
        {
          id: '2',
          name: '标语检索',
          code: 'sloganSearch',
          to: '/search',
          auth: true
        },
        {
          id: '3',
          name: '单字检索',
          code: 'oneSearch',
          to: '/search',
          auth: true
        },
        {
          id: '4',
          name: '用户论坛',
          code: 'userPlatForm',
          to: '/blog',
          auth: true
        }
      ],
      title: '红军标语数字典藏库',
      menuRight: [
        {
          id: '1',
          name: '新闻列表',
          code: 'newsList',
          to: '/news',
          auth: true
        },
        { id: '2', name: '汉字识别', code: 'wordSpot', to: '/', auth: true },
        {
          id: '3',
          name: '个人中心',
          code: 'person',
          to: '/person',
          auth: true
        },
        {
          id: '4',
          name: '登录注册',
          code: 'logReg',
          to: '/logReg',
          auth: false
        }
      ]
    }
  },
  methods: {
    // 点击菜单触发操作
    handleTabClick(item) {
      // if ((item.auth && getToken()) || !item.auth) {
      // console.log({ ...item }, 'item', this.$route.query.source)
      if (item.code === this.$route.query.source) return false
      
      item.to !== '/' &&
      this.$router.replace({
        path: item.to,
        query: { source: item.code }
      })
      // } else {
      //   return this.$message.error('请登录')
      // }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/index.scss';

.menu-tab {
  /* 可以在这里添加背景图 */
  overflow: hidden;
  @include width;
  @include ml;
  position: relative;
  // box-shadow: 0 1px 1px 1px inset;
  border-bottom: 2px solid #a1000a;
  opacity: 0.9;
  margin-bottom: 20px;
  
  &-body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #a1000a;
    font-size: 24px;
    
    .title {
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
