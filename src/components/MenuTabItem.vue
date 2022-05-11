<template>
  <div class="menu-tab-item">
    <div v-for="(item, index) in list" class="menu-tab-item-body" :key="index">
      <span class="menu-tab-item-body-item" @click="handleItemClick(item)">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      // 接收菜单数据 s
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleItemClick(item) {
      // 触发父组件方法，操作数据传递
      this.$emit('handleTabClick', item)
    }
  }
}
</script>

<style lang="scss" scoped>
/* sass 语法 */
.menu-tab-item {
  width: 500px;
  display: flex;
  margin: 10px;
  &-body {
    margin: 5px 10px;
    width: 120px;
    &-item {
      width: 120px;
      background-color: #a1000a;
      color: #ffffff;
      cursor: pointer;
      padding: 5px 20px;
      font-size: 16px;
      border-radius: 4px;
    }
  }
}
</style>
