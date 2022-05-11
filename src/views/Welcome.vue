<template>
  <div class='home'>
    <banner :bannerList='bannerList' />
    <!-- 新闻列表 -->
    <div class='home-list'>
      <h3 class='home-list-title'>
        <span>新闻 Top 榜 </span>
        <span class='more' @click="$router.push('/news')">更多>></span>
      </h3>
      <template v-for='(item, index) in articleList'>
        <el-card
          v-if='index < 3'
          :key='item.id'
          :body-style="{ padding: '0px' }"
          class='home-list-card'
          @click.native='handleCardClick(item)'
        >
          <div class='body'>
            <img :src='item.url' alt='url' class='image' height='100' width='100' />
            <div class='words'>
              <div class='words-name'>{{ item.title }}</div>
              <div class='bottom'>{{ item.arContent }}</div>
            </div>
          </div>
        </el-card>
      </template>
    </div>
    <!-- 用户论坛列表 -->
    <div class='home-list'>
      <h3 class='home-list-title'>
        <span>论坛 Top 榜 </span>
        <span class='more' @click="$router.push('/news')">更多>></span>
      </h3>
      <template v-for='(item, index) in blogList'>
        <el-card
          v-if='index < 3'
          :key='item.id'
          :body-style="{ padding: '0px' }"
          class='home-list-card'
          @click.native='handleCardClick(item)'
        >
          <div class='body'>
            <img :src='item.url' alt='url' class='image' height='100' width='100' />
            <div class='words'>
              <div class='words-name'>{{ item.title }}</div>
              <div class='bottom'>{{ item.arContent }}</div>
            </div>
          </div>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script>
import img from '@/assets/banner.png'
import logo from '@/assets/logo.png'
import bg from '@/assets/bg.png'
import Banner from '@/components/banner.vue'
import { bbs, webComeList } from '@/api'
import { deleteToken } from '@/utils/auth'
import config from '@/config'

export default {
  data() {
    return {
      bannerList: [
        { id: '1', name: '', code: '', url: img },
        { id: '2', name: '', code: '', url: logo },
        { id: '3', name: '', code: '', url: bg }
      ],
      articleList: [],
      blogList: []
    }
  },
  mounted() {
    deleteToken()
    this.init()
  },
  methods: {
    init() {
      // 欢迎页 新闻 top 榜
      webComeList().then((result) => {
        this.articleList = result.rows.map((row) => {
          row.url = config.serverUrl + row.url
          return row
        })
      })
      // 欢迎页 论坛 top 榜
      bbs().then((result) => {
        this.blogList = result.rows.map((row) => {
          row.url = config.serverUrl + row.url
          return row
        })
      })
    },
    // 点击列表 item，进入详情
    handleCardClick(item) {
      this.$router.push({
        path: '/news_detail',
        query: { ...item, source: 'welcome' }
      })
    }
  },
  components: { Banner }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/index.scss';

.home {
  /* 可以在这里添加背景图 */
  //overflow: hidden;
  height: auto;
  width: 99vw;
  /* 列表样式 */
  &-list {
    height: 430px;
    
    margin-bottom: 100px;
    
    &-title {
      @include ml;
      @include width;
      margin-bottom: 30px;
      color: #a1000a;
      display: flex;
      justify-content: space-between;
      
      .more {
        margin-right: 10px;
        color: #aaa;
        cursor: pointer;
      }
    }
    
    &-card {
      @include width;
      @include ml;
      margin-bottom: 30px;
      cursor: pointer;
      border: none;
      
      .body {
        padding: 14px;
        display: flex;
        
        .words {
          margin-left: 3vw;
          
          &-name {
            font-size: 24px;
            margin-bottom: 24px;
            margin-top: 2px;
          }
          
          .bottom {
            font-size: 20px;
            color: gray;
          }
        }
      }
    }
  }
}
</style>
