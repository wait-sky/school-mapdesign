<template>
  <div class="blog">
    <el-button
      style="margin: 0 0 20px 0"
      type="danger"
      @click="$refs.publishDialog.init()"
      >发布论坛</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed type="index" label="序号" width="60" />
      <el-table-column prop="title" label="新闻标题" min-width="120" />
      <el-table-column label="封面图片" min-width="120">
        <template slot-scope="scope">
          <div style="min-width: 120px">
            <img :src="scope.row.url" alt="url" width="90%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" min-width="120" />
      <el-table-column prop="arContent" label="新闻简介" min-width="180" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <publish-dialog ref="publishDialog" />
  </div>
</template>

<script>
import { bbs } from '@/api'
import config from '@/config'
import PublishDialog from './component/dialog.vue'
export default {
  components: { PublishDialog },
  methods: {
    // 查看详情
    handleClick(row) {
      this.$router.push({
        path: '/blog_detail',
        query: { content: row.content, bbsId: row.id}
      })
    },
    init() {
      // 获取列表数据
      bbs().then((res) => {
        if (res.code == '200') {
          this.tableData = res.rows.map((row) => {
            row.url = config.serverUrl + row.url
            return row
          })
        }
      })
    }
  },

  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.blog {
  @include ml;
  @include width;
}
</style>
