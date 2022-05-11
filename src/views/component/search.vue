<template>
  <el-form
    ref='queryParams'
    :model='queryParams'
    class='demo-queryParams'
    inline
    label-width='100px'
  >
    <template v-if='$route.query.source === "oneSearch"'>
      <el-form-item label='单字编号'>
        <el-input
          v-model='queryParams.charName'
          clearable
          size='small'
          style='width: 200px'
        />
      </el-form-item>
    
    </template>
    <el-form-item v-else label='标语编号'>
      <el-input
        v-model='queryParams.sloganTitle'
        clearable
        size='small'
        style='width: 200px'
      />
    </el-form-item>
    
    <el-form-item label='类别'>
      <el-select
        v-model='queryParams.type'
        clearable
        filterable
        placeholder='请选择类别'
        size='small'
      >
        <el-option label='已修复' value='1'></el-option>
        <el-option label='未修复' value='0'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="$route.query.source !== 'oneSearch'" label='状态'>
      <el-select
        v-model='queryParams.repairState'
        clearable
        filterable
        placeholder='请选择状态'
        size='small'
      >
        <el-option label='已修复' value='1'></el-option>
        <el-option label='未修复' value='0'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        style='margin-left: 20px'
        type='primary'
        @click='handleQueryClick'
      >查询
      </el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      queryParams: {
        sloganTitle: '', // 标语编号
        sloganScan: '', // 标语内容
        type: '', // 类别
        charName: '', // 单字编号
        repairState: '' // 状态
      }
    }
  },
  methods: {
    // 点击查询，触发查询列表接口
    handleQueryClick() {
      this.$emit('handleQueryForm', this.queryParams)
    }
    // TODO 增加 类别接口
  }
}
</script>
