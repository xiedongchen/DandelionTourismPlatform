<template>
  <div id="firm">
    <el-form ref="formVal" :model="formVal" label-width="100px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基础信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="原密码">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="新密码">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="确认密码">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style=" margin-top: 10px; display: flex; justify-content:center;">
            <el-form-item>
              <el-button type="primary">提交</el-button>
              <el-button type="danger">取消</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'lineAdd',

  data() {
    return {
      formVal: {}
    }
  }
}
</script>



