<template>
  <div id="firm">
    <el-form ref="formVal" :model="formVal" label-width="100px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基础信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司ID">
                <span>{{ formVal.ID }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司类型">
                <span>{{ formVal.Type }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="短信">
                <span>{{ formVal.Type }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="积分">
                <span>{{ formVal.Type }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司名称">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司昵称">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司属地">
                <el-input placeholder="请输入内容" v-model="formVal.name" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="证书类型">
                <el-select v-model="formVal.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="证书号码">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="法人">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司地址">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
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
              <el-form-item label="联系人">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="联系人电话">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="更多联系信息">
                <el-input type="textarea" :rows="1" placeholder="一行一个联系人，格式如：（杨经理：12629296601）电话号码中间请勿添加空格等字符" v-model="formVal.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司电话">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司传真">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司网站">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司邮箱">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="400电话">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="800电话">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="所在大厦/小区">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="公司QQ">
                <el-input v-model="formVal.region" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>详细信息</span>
        </div>
       <tinymce :height="300" v-model="formVal.Trip" id="tinymce"></tinymce>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>附件</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="缩略图">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="logo">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
import Tinymce from '@/components/Tinymce/index';
export default {
  name: 'lineAdd',
  components: { Tinymce },
  data() {
    return {
      formVal: {},
      dialogVisible: false,
      dialogImageUrl: '',
      imageUrl: ''
    };
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
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
