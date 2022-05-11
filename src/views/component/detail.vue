<template>
  <div class='detail'>
    <el-card
      v-if="form.source === 'welcome'"
      style='width: 80vw; text-align: center; margin: 0 0 30px 10vw'
    >
      <img :src='form.url' alt='url' class='image' width='400px' />
      <div style='padding: 14px'>
        <span>{{ form.title }}</span>
        <div class='bottom' style='margin-top: 20px'>
          <time class='time'>{{ form.content }}</time>
        </div>
      </div>
    </el-card>
    <el-card
      v-else
      style='width: 80vw; text-align: center; margin: 0 0 30px 10vw'
    >
      <!-- 兼容标语和检索 -->
      <!--{{ form.sloganUrl || form.charUrl }}-->
      <img :src='form.sloganUrl || form.charUrl' alt='url' class='image' width='400px' />
      <div style='padding: 14px'>
        <span>{{ form.sloganTitle || form.charName }}</span>
        <div class='bottom' style='margin-top: 20px'>
          <time class='time'>{{ form.sloganStory || form.charContent }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    // console.log({ ...this.$route.query })
    this.form = this.$route.query
  }
}
</script>
