<template>
  <div class="person">
    <el-card>
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <el-form label-width="100px" class="demo-ruleForm">
        <div style="text-align: center">
          <img
            :src="avatar || require('@/assets/logo.png')"
            alt="avatar"
            width="100px"
            height="100px"
            style="border-radius: 50%; margin-bottom: 10px"
          />
        </div>
        <el-form-item label="用户名称">
          <el-input v-model="form.userName" disabled />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="form.userName" disabled />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phonenumber" disabled />
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="form.email" disabled />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input
            v-model="form.dept.deptName + ' / ' + form.remark"
            disabled
          />
        </el-form-item>
        <el-form-item label="所属角色">
          <el-input v-model="form.roles[0].roleName" disabled />
        </el-form-item>
        <el-form-item label="创建日期">
          <el-input v-model="form.createTime" disabled />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getInfo, getAvatar } from '@/api'
import config from '@/config'
export default {
  data() {
    return {
      form: {
        dept: {},
        roles: [{ roleName: '' }]
      },
      avatar: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 获取用户头像
      getAvatar().then((res) => {
        if (res.code == '200') {
          this.avatar = config.serverUrl + res.data.avatar
        }
      })
      // 获取用户信息
      getInfo().then((res) => {
        if (res.code != '200') {
          this.$message.error('请点击登录注册按钮进行登录')
          this.$router.push('/')
        } else {
          this.form = res.user
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.person {
  @include width;
  @include ml;
  ::v-deep .el-input__inner {
    text-align: right;
  }
}
</style>
