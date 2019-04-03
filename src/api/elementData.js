// Element-ui 常用事件封装

exports.install = function(Vue, options) {
  Vue.prototype.handleThumbSuccess = function(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
    this.formVal.Thumb = res.src;
  };

  Vue.prototype.handleImagesSuccess = function(res, file) {
    this.formVal.ImagesArr.push(res.id);
    this.formVal.Images = this.formVal.ImagesArr.join(",");
  };

  Vue.prototype.beforeImageUpload = function(file) {
    // const isJPG = file.type === 'image/jpeg'
    // const isLt2M = file.size / 1024 / 1024 < 2
    // if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!')
    // }
    // if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    // }
    // return isJPG && isLt2M
  };

  Vue.prototype.handleRemove = function(file) {
    if (file.response) {
      let i = this.formVal.ImagesArr.indexOf(file.response.id);
      this.formVal.ImagesArr.splice(i, 1);
    } else {
      let i = this.formVal.ImagesArr.indexOf(file.name);
      this.formVal.ImagesArr.splice(i, 1);
    }
    this.formVal.Images = this.formVal.ImagesArr.join(",");
  };

  Vue.prototype.handlePictureCardPreview = function(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisibleImg = true;
  };

};
