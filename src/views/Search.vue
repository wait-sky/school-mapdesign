<template>
  <div class='search'>
    <!-- 轮播 -->
    <banner :bannerList='bannerList' />
    <!-- 搜索条件 -->
    <div class='search-layout'>
      <div style='text-align: left; font-size: 24px'>
        {{ source === 'oneSearch' ? '单字检索' : '标语信息' }}
      </div>
      <search-form @handleQueryForm='handleQueryForm' />
    </div>
    <!-- 列表 -->
    <div class='search-list'>
      <template v-if='articleList.length'>
        <el-card
          v-for='(item, index) in articleList'
          :key='index'
          :body-style="{ padding: '0px' }"
          class='search-list-card'
          @click.native='handleCardClick(item)'
        >
          <div v-if="source === 'oneSearch'" style='padding: 14px'>
            <img :src='item.charUrl' alt='url' class='image' height='100' width='100' />
            <div class='bottom'>{{ item.charNum }}</div>
            <div>{{ item.charName }}</div>
          </div>
          <div v-else style='padding: 14px'>
            <img :src='item.sloganUrl' alt='url' class='image' height='100' width='100' />
            <div>{{ item.sloganTitle }}</div>
            <div class='bottom'>{{ item.sloganStory }}</div>
          </div>
        </el-card>
      </template>
      <div
        v-else
        style='
          text-align: center;
          font-size: 24px;
          margin-top: 30px;
          color: gray;
        '
      >
        暂无数据
      </div>
    </div>
    <!-- 分页 -->
    <div class='search-page'>
      <el-pagination
        v-if='queryParams.total > 0'
        :page-count='queryParams.pageCount'
        :page-size='queryParams.pageSize'
        :total='queryParams.total'
        background
        layout='prev, pager, next'
        @current-change='handleCurrentChange'
      />
    </div>
  </div>
</template>

<script>
import SearchForm from './component/search.vue'
import img from '@/assets/banner.png'
import logo from '@/assets/logo.png'
import bg from '@/assets/bg.png'
import Banner from '@/components/banner.vue'
import { char, slogan } from '@/api'
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
      if (this.source === 'oneSearch') {
        char(queryParams).then((res) => {
          this.articleList = res.rows.map((row) => {
            row.charUrl = config.serverUrl + row.charUrl
            return row
          })
          this.queryParams.total = res.total
        })
      } else {
        // 标语检索、标语修复
        slogan(queryParams).then((res) => {
          this.articleList = res.rows.map((row) => {
            row.sloganUrl = config.serverUrl + row.sloganUrl
            return row
          })
          this.queryParams.total = res.total
        })
      }
    },
    // 点击列表 item，进入详情
    handleCardClick(item) {
      this.$router.push({
        path: '/detail',
        query: { ...item }
      })
    },
    // 查询列表数据
    handleQueryForm(form) {
      this.queryParams = { ...this.queryParams, ...form }
      this.initMethods(this.queryParams)
    },
    // 当前  第几页 上一页，下一页
    handleCurrentChange(val) {
      this.queryParams.pageCount = val
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
    margin: 0 10.5vw;
    height: 430px;
    
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
