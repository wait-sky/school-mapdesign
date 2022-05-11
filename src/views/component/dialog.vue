<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="isOpen"
    append-to-body
    :show-close="true"
    title="发布博客"
    top="20vh"
    width="80vw"
  >
    <!-- 发布文章 -->
    <div class="publish">
      <el-card>
        <editor />
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import Editor from '@/components/Editor.vue'
export default {
  name: 'RegisterDialog',
  components: { Editor },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    // 页面初始化
    init() {
      this.isOpen = true
    }
  }
}
</script>
