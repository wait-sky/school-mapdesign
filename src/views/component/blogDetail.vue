<template>
  <div class='detail'>
    <!-- 详细内容 -->
    <el-card class='detail-publish'>
      <div slot='header' style='text-align:left'>
        <span style='font-weight: bold;'>详细内容</span>
      </div>
      <div class='detail-publish-body'>
        <div class='bottom' v-html='content'></div>
      </div>
    </el-card>
    <!-- 评论列表 -->
    <el-card class='detail-comment'>
      <div slot='header' style='text-align:left'>
        <span style='font-weight: bold;'>评论列表</span>
      </div>
      <div class='detail-comment-publish'>
        <div
          ref='divRef'
          class='editor'
          contenteditable
          @keydown='handleKeyDown'
          @keyup='handleKeyUp'
        />
        <el-button type='primary' @click='handlePublishClick'>发布评论</el-button>
        <!-- 选项 -->
        <AtDialog
          v-if='showDialog'
          :position='position'
          :queryString='queryString'
          :userList='userList'
          :visible='showDialog'
          @onHide='handleHide'
          @onPickUser='handlePickUser'
          @onShow='handleShow'
        />
      </div>
      <div v-for='item in commentsList' class='comment-body'>
        <span class='title'>{{ item.userName }}:</span>
        <div class='content' v-html='item.content'></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getComments, publishComments } from '@/api'
import AtDialog from '@/components/AtDialog'
import { getToken } from '@/utils/auth'

export default {
  components: { AtDialog },
  data() {
    return {
      content: '',
      commentsList: [],
      bbsId: '',
      inputComments: '',
      userList: [],
      //  弹窗
      node: '', // 获取到节点
      user: '', // 选中项的内容
      endIndex: '', // 光标最后停留位置
      queryString: '', // 搜索值
      showDialog: false, // 是否显示弹窗
      position: { // 弹窗显示位置
        x: 0, y: 0
      }
    }
  },
  mounted() {
    this.content = this.$route.query.content
    this.content = this.content.replace(/\/profile/g, 'http://120.25.173.28:8080/profile').replace(/\/dev-api/g, '')
    this.bbsId = this.$route.query.bbsId
    this.init()
  },
  methods: {
    init() {
      // 获取列表接口数据
      getComments().then(co => {
        if (co.code == '200') {
          this.commentsList = co.rows
          // 找到相关数据 并去重
          let tempList = this.commentsList.map(item => item.userName)
          tempList = new Set(tempList)
          // 过滤 不符合条件的 数据
          this.userList = Array.from(tempList).filter(item => item != null)
          // 组织数据结构
          this.userList = this.userList.map(item => {
            return {
              name: item,
              id: item
            }
          })
          // console.log(this.userList)
        }
      })
    },
    // 获取光标位置
    getCursorIndex() {
      const selection = window.getSelection()
      return selection.focusOffset // 选择开始处 focusNode 的偏移量
    },
    // 获取光标节点
    getRangeNode() {
      const selection = window.getSelection()
      return selection.focusNode // 选择结束的节点
    },
    // 弹窗出现的位置
    getRangeRect() {
      const selection = window.getSelection()
      const range = selection.getRangeAt(0) // 是用于管理选择范围的通用对象
      const rect = range.getClientRects()[0] // 获取选择范围的矩形
      const LINE_HEIGHT = 30 // 行高
      return {
        x: rect.x,
        y: rect.y + LINE_HEIGHT
      }
    },
    // 是否展示 @
    showAt() {
      const node = this.getRangeNode()
      if (!node || node.nodeType !== Node.TEXT_NODE) return false
      const content = node.textContent || ''
      const regx = /@([^@\s]*)$/
      const match = regx.exec(content.slice(0, this.getCursorIndex()))
      return match && match.length === 2
    },
    // 获取 @ 列表
    getAtUser() {
      const content = this.getRangeNode().textContent || ''
      const regx = /@([^@\s]*)$/
      const match = regx.exec(content.slice(0, this.getCursorIndex()))
      if (match && match.length === 2) {
        return match[1]
      }
      return undefined
    },
    // 创建标签
    createAtButton(user) {
      const btn = document.createElement('span')
      btn.className = 'at-button'
      btn.style.display = 'inline-block'
      btn.dataset.user = JSON.stringify(user)
      btn.contentEditable = 'false'
      btn.textContent = `@${user.name}`
      const wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.contentEditable = 'false'
      const spaceElem = document.createElement('span')
      spaceElem.style.whiteSpace = 'pre'
      spaceElem.textContent = '\u200B'
      spaceElem.contentEditable = 'false'
      const clonedSpaceElem = spaceElem.cloneNode(true)
      wrapper.appendChild(spaceElem)
      wrapper.appendChild(btn)
      wrapper.appendChild(clonedSpaceElem)
      return wrapper
    },
    // 替换
    replaceString(raw, replacer) {
      return raw.replace(/@([^@\s]*)$/, replacer)
    },
    // 插入 @ 标签
    replaceAtUser(user) {
      const node = this.node
      if (node && user) {
        const content = node.textContent || ''
        const endIndex = this.endIndex
        const preSlice = this.replaceString(content.slice(0, endIndex), '')
        const resSlice = content.slice(endIndex)
        const parentNode = node.parentNode
        const nextNode = node.nextSibling
        const previousTextNode = new Text(preSlice)
        const nextTextNode = new Text('\u200b' + resSlice) // 添加 0 宽字符
        const atButton = this.createAtButton(user)
        parentNode.removeChild(node)
        // 插在文本框中
        if (nextNode) {
          parentNode.insertBefore(previousTextNode, nextNode)
          parentNode.insertBefore(atButton, nextNode)
          parentNode.insertBefore(nextTextNode, nextNode)
        } else {
          parentNode.appendChild(previousTextNode)
          parentNode.appendChild(atButton)
          parentNode.appendChild(nextTextNode)
        }
        // 重置光标的位置
        const range = new Range()
        const selection = window.getSelection()
        range.setStart(nextTextNode, 0)
        range.setEnd(nextTextNode, 0)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    // 键盘抬起事件
    handleKeyUp() {
      if (this.showAt()) {
        const node = this.getRangeNode()
        const endIndex = this.getCursorIndex()
        this.node = node
        this.endIndex = endIndex
        this.position = this.getRangeRect()
        this.queryString = this.getAtUser() || ''
        this.showDialog = true
      } else {
        this.showDialog = false
      }
    },
    // 键盘按下事件
    handleKeyDown(e) {
      if (this.showDialog) {
        if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'Enter') {
          e.preventDefault()
        }
      }
    },
    // 插入标签后隐藏选择框
    handlePickUser(user) {
      this.replaceAtUser(user)
      this.user = user
      this.showDialog = false
    },
    // 隐藏选择框
    handleHide() {
      this.showDialog = false
    },
    // 显示选择框
    handleShow() {
      this.showDialog = true
    },
    //  发布评论
    handlePublishClick() {
      if (!getToken()) return this.$message.error('请登录')
      if (!this.$refs.divRef.innerText) return this.$message.error('请输入评论内容')
      const queryBody = {
        bbsId: this.bbsId,
        content: this.$refs.divRef.innerText
      }
      publishComments(queryBody).then(res => {
        if (res.code == '200') {
          this.$refs.divRef.innerText = ''
          this.$message.success('发布成功')
          this.init()
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/index.scss';

.detail {
  height: auto;
  
  &-publish {
    text-align: center;
    @include ml;
    @include width;
    
    &-body {
      padding: 14px;
      
      .bottom {
        margin-top: 20px;
        text-align: left;
        width: 100%;
        /* 保证 html 代码中的 img 不能超过边界 */
        ::v-deep img {
          width: 100%;
        }
      }
    }
  }
  
  &-comment {
    margin-top: 30px;
    @include ml;
    @include width;
    
    &-publish {
      text-align: left;
      margin-bottom: 30px;
      display: flex;
      
      .editor {
        margin-right: 50px;
        width: 600px;
        height: 150px;
        background: #fff;
        border: 1px solid blue;
        border-radius: 4px;
        text-align: left;
        padding: 10px;
        overflow: auto;
        line-height: 30px;
        
        &:focus {
          outline: none;
        }
      }
    }
    
    .comment-body {
      .content {
        text-indent: 2em;
        margin: 3px 0;
      }
    }
  }
}
</style>
