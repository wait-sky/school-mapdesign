<template>
  <div class='search'>
    <!-- 轮播 -->
    <banner :bannerList='bannerList' />
    <!-- 列表 -->
    <div class='search-list'>
      <el-table :data='articleList' border style='width: 100%'>
        <el-table-column fixed label='序号' type='index' width='60' />
        <el-table-column label='图片' min-width='120'>
          <template slot-scope='scope'>
            <div style='min-width: 120px'>
              <img :src='scope.row.url' alt='url' width='90%' />
            </div>
          </template>
        </el-table-column>
        <el-table-column label='新闻标题' min-width='120' prop='title' />
        <el-table-column label='新闻简介' min-width='180' prop='arContent' />
        <el-table-column label='操作' width='100'>
          <template slot-scope='scope'>
            <el-button type='text' @click='handleCardClick(scope.row)'>查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<template v-if='articleList.length'>-->
      <!--  <el-card-->
      <!--    v-for='(item, index) in articleList'-->
      <!--    :key='index'-->
      <!--    :body-style="{ padding: '0px' }"-->
      <!--    class='search-list-card'-->
      <!--    @click.native='handleCardClick(item)'-->
      <!--  >-->
      <!--    <div style='padding: 14px'>-->
      <!--      <img :src='item.url' alt='url' class='image' height='100' width='100' />-->
      <!--      <div>{{ item.title }}</div>-->
      <!--      <div class='bottom'>{{ item.arContent }}</div>-->
      <!--    </div>-->
      <!--  </el-card>-->
      <!--</template>-->
      <!--<div-->
      <!--  v-else-->
      <!--  style='-->
      <!--    text-align: center;-->
      <!--    font-size: 24px;-->
      <!--    margin-top: 30px;-->
      <!--    color: gray;-->
      <!--  '-->
      <!--&gt;-->
      <!--  暂无数据-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import SearchForm from './component/search.vue'
import img from '@/assets/banner.png'
import logo from '@/assets/logo.png'
import bg from '@/assets/bg.png'
import Banner from '@/components/banner.vue'
import { news } from '@/api'
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
      queryParams: {
        pageSize: 10,
        pageCount: 0,
        total: 0
      },
      source: '' // 判断来源，标语还是单字
    }
  },
  components: { SearchForm, Banner },
  mounted() {
    // 监控来源
    // console.log(this.$route.query, 123)
    this.initVariables()
  },
  methods: {
    // 初始化变量
    initVariables() {
      this.source = this.$route.query.source
      // 判定标语修复 repairState 有此值为标语修复，无此值为标语检索
      if (this.source === 'sloganRepair') {
        this.queryParams['repairState'] = 1
      }
      this.initMethods(this.queryParams)
    },
    initMethods(queryParams) {
      // 单字检索
      news(queryParams).then((res) => {
        this.articleList = res.rows.map((row) => {
          row.url = config.serverUrl + row.url
          return row
        })
        this.queryParams.total = res.total
      })
    },
    // 点击列表 item，进入详情
    handleCardClick(item) {
      this.$router.push({
        path: '/news_detail',
        query: { ...item }
      })
    },
    // 查询列表数据
    handleQueryForm(form) {
      this.queryParams = { ...this.queryParams, ...form }
      this.initMethods(this.queryParams)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/index.scss';

.search {
  min-height: 700px;
  /* 查询条件 */
  &-layout {
    text-align: center;
    // margin: 0 10.5vw;
    padding: 10px 0;
    @include width;
    @include ml;
  }
  
  /* 列表样式 */
  &-list {
    margin: 0 10.5vw 20px;
    //height: 430px;
    
    &-card {
      width: 11vw;
      text-align: center;
      float: left;
      margin: 1vw;
      cursor: pointer;
      border: none;
    }
  }
  
  /* 分页样式 */
  &-page {
    @include ml;
    @include width;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 50px;
  }
}
</style>
