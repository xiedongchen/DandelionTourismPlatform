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
              <el-form-item label="用户ID">
                <span>{{ formVal.ID }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="用户组">
                <span>{{ formVal.ID }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="用户类型">
                <span>{{ formVal.ID }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="用户名">
                <span>{{ formVal.ID }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="注册时间">
                <span>{{ formVal.ID }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>联系信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="昵称">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="真实姓名">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="性别">
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="年龄">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="电话">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="手机">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="邮箱">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="QQ">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="简介">
                <el-input type="textarea" :rows="3" placeholder="请控制在60个字以内" v-model="formVal.name"></el-input>
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
      formVal: {},
      dialogVisible: false,
      dialogImageUrl: '',
      imageUrl: ''
    }
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>


<style scope>
.el-card {
  margin-bottom: 10px;
}
.el-select {
  width: 100%;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
