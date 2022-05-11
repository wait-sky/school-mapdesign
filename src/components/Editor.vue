<template>
  <div class='create-or-update'>
    <el-form
      ref='ruleForm'
      :model='ruleForm'
      :rules='rules'
      class='demo-ruleForm'
      label-width='120px'
    >
      <el-form-item label='文章标题' prop='title' style='width: 50%'>
        <el-input v-model='ruleForm.title' clearable />
      </el-form-item>
      <el-form-item label='封面图片' style='width: 40%'>
        <el-upload
          :before-upload='beforeImageUpload'
          :http-request='(file) => uploadFile(file)'
          :show-file-list='false'
          action=''
          class='upload-demo res-upload-demo'
          style='display: inline-block'
        >
          <el-button v-if='imageUrl' type='text'>重新上传</el-button>
          <el-button v-else type='text'>上传</el-button>
        </el-upload>
        <div v-if='imageUrl' style='width: 200px'>
          <img :src='imageUrl' alt='url' width='100%' />
        </div>
      </el-form-item>
      <el-form-item label='文章详细内容' prop='content' style='width: 100%'>
        <div
          id='editorcontent'
          class='editor'
          style='width: 50vw; height: 350px'
        ></div>
      </el-form-item>
      <el-form-item label='文章简介' prop='arContent' style='width: 50%'>
        <el-input v-model='ruleForm.arContent' clearable />
      </el-form-item>
      <el-form-item>
        <el-button class='btn' type='primary' @click="submitForm('ruleForm')">
          发布文章
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'
import { publish, uploadAvatar } from '@/api'
import config from '@/config'

export default {
  name: 'CreateAnArticle',
  data() {
    return {
      editor: null,
      editorData: '',
      thumbnail: [], // 缩略图
      imageUrl: '',
      url: '',
      ruleForm: {
        title: '',
        url: '',
        content: null, // 富文本编辑器内容
        arContent: null
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        url: [
          { required: true, message: '请选择封面图片', trigger: 'change,blur' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ],
        arContent: [
          { required: true, message: '请输入文章简介', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    // 初始化 富文本编辑器
    init() {
      const editor = new wangEditor('#editorcontent')
      // console.log(editor)
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml
      }
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        'head',
        'bold',
        'italic',
        'underline',
        'foreColor',
        'backColor',
        'image',
        'undo',
        'redo'
      ]
      editor.config.height = window.innerHeight - 450
      editor.config.zIndex = 100
      // 配置粘贴文本的内容处理
      editor.config.pasteTextHandle = (pasteStr) => {
        this.ruleForm.content = pasteStr // 追加富文本中的内容
        return pasteStr
      }
      // 配置 Server 接口地址
      editor.config.showLinkImg = true //关闭网络路径图片方式
      editor.config.uploadImgServer =
        config.serverUrl + '/system/tool/avatar?fileType=0' // 上传图片的接口地址
      // editor.config.uploadImgShowBase64 = true
      editor.config.uploadFileName = 'file' // formdata中的name属性
      editor.config.uploadImgTimeout = 30 * 1000
      editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片
      editor.config.uploadImgHooks = {
        // 可使用回调函数，对上传图片的不同阶段，做相应处理
        customInsert: (insertImgFn, result) => {
          if (result.code === 200) {
            // 如果上传一张本地图片
            insertImgFn(config.serverUrl + result.imgUrl)
          }
        }
      }
      // 创建编辑器
      editor.create()
      this.editor = editor
    },
    // 提交创建文章
    submitForm(formName) {
      this.ruleForm.content = this.editorData || ''
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 缩略图配置
          this.thumbnail = []
          const imgReg = /<img.*?src="(.*?)".*?\/?>/gi
          if (this.ruleForm.content.indexOf('src') > -1) {
            ;[...this.ruleForm.content.match(imgReg)].forEach((item) => {
              const url = item.split('src="')[1].split('"')[0]
              this.thumbnail.push({
                type: 0,
                url: url.replace(/&amp;/g, '&')
              })
            })
          }
          this.loadCreateArticle()
        } else {
          return false
        }
      })
    },
    // todo 这个函数现在应该是没有地方用了！
    beforeImageUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5
      const arr = ['image/jpeg', 'image/png', 'image/jpg']
      const isJPG = arr.indexOf(file.type) !== -1
      if (!isJPG) {
        this.$message.error('上传文件图片只能是 JPG/PNG 格式')
      }
      if (!isLt2M) {
        this.$message.error('上传文件图片大小不能超过 5MB')
      }
      return isJPG && isLt2M
    },
    // 上传图片
    uploadFile(file) {
      let uploadData = new FormData()
      uploadData.append('file', file.file)
      uploadAvatar(uploadData).then((res) => {
        if (res.code == '200') {
          this.$message.success('上传成功')
          this.ruleForm.url = res.imgUrl
          this.imageUrl = config.serverUrl + res.imgUrl
        }
      })
      // TODO上传接口
    },
    // 创建或发布文章
    loadCreateArticle() {
      if (!this.ruleForm.url) {
        return this.$message.error('请上传封面图片')
      }
      this.ruleForm.content = this.ruleForm.content.replace(
        /http:\/\/120\.25\.173\.28:8080/g,
        ''
      )
      publish(this.ruleForm).then((res) => {
        // console.log(res, ' res')
        if (res.code == '200') {
          this.$router.push('/blog')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.create-or-update {
  width: 90%;
  
  ::v-deep .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      
      &:hover {
        border-color: #409eff;
      }
      
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
        
        &-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
      }
    }
  }
}

.editor {
  ::v-deep .w-e-text-container {
    height: 300px !important;
    text-align: left;
  }
}
</style>
