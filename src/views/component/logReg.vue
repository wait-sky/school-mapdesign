<template>
  <div class="login">
    <el-card>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="hasToken"
            type="danger"
            @click="handleUpdateClick('logout')"
            >退出登录</el-button
          >
          <el-button v-else type="primary" @click="handleUpdateClick('login')"
            >登录</el-button
          >
          <el-button type="primary" @click="handleUpdateClick('register')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { apiLogin, apiRegister, logout } from '@/api'
import { setToken, getToken, deleteToken } from '@/utils/auth'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        uuid: '97eb45877686419cb57f10f31d6e4c46'
      },
      hasToken: '',
      rules: {
        username: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.hasToken = getToken()
  },
  methods: {
    handleUpdateClick(type) {
      if (type === 'logout') {
        logout().then((res) => {
          if (res.code == '200') {
            deleteToken()
            this.$message.success('退出成功')
            this.$router.push('/')
          }
        })
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (getToken()) {
              return this.$message.error('已登录，请勿重复操作')
            }
            if (type === 'login') {
              apiLogin(this.ruleForm).then((res) => {
                const { msg, code, token } = res
                if (code == '200') {
                  this.$message.success(msg)
                  setToken(token)
                  this.$router.push('/home')
                } else {
                  this.$message.error(msg)
                }
              })
            } else {
              apiRegister(this.ruleForm).then((res) => {
                const { msg, code } = res
                if (code == '200') {
                  this.$message.success(msg)
                } else {
                  this.$message.error(msg)
                }
              })
            }
          } else {
            return false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.login {
  @include width;
  @include ml;
}
</style>
