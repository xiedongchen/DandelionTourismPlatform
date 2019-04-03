import request from "@/utils/request";

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 初始化数据
export function i_initData() {
  let Select = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("请选择内容"));
    }
  };
  let Input = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("请输入内容"));
    }
  };
  return {
    uploadUrl: process.env.BASE_API + "/Vue/Upload/onepic",
    dialogVisible: false,
    dialogVisibleImg: false,
    dialogImageUrl: "",
    imageUrl: "",
    formVal: {
      ComID: "661",
      SortTID: "0",
      SortPID: "",
      SortID: "",
      PriceDanwei: "486",
      Thumb: "",
      Images: "",
      ImagesArr: [],
      File: "",
      File2: "",
      File3: "",
      File4: ""
    },
    Initial: {
      AreaArr: [],
      Preset: []
    },
    rules: {
      ProductName: [{ type: "string", validator: Input, trigger: "blur" }],
      ProductNick: [{ type: "string", validator: Input, trigger: "blur" }],
      AreaArr: [{ type: "array", validator: Select, trigger: "blur" }],
      ProductSex: [{ type: "array", validator: Select, trigger: "blur" }],
      QuanPei: [{ type: "array", validator: Select, trigger: "blur" }],
      ChuFaDi: [{ type: "array", validator: Select, trigger: "blur" }],
      ProductType: [{ type: "array", validator: Select, trigger: "blur" }],
      TianShu: [{ type: "array", validator: Select, trigger: "blur" }],
      ChuYou: [{ type: "array", validator: Select, trigger: "blur" }],
      JiaoTong: [{ type: "array", validator: Select, trigger: "blur" }],
      PriceTip: [{ type: "string", validator: Input, trigger: "blur" }],
      Price: [{ type: "string", validator: Input, trigger: "blur" }],
      Earnest: [{ type: "string", validator: Input, trigger: "blur" }],
      Rebate: [{ type: "string", validator: Input, trigger: "blur" }]
    }
  };
}

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 加载预设
export function i_initSettings(pg) {
  s_setPreset(pg);
}

// @@ ==========================================
// @@ C 级别函数
// @@ ==========================================
// @@ 提交
export function c_doSubmit(pg, formName) {
  pg.$refs[formName].validate(valid => {
    if (!valid) {
      pg.$message.error("请检查输入项");
      return false;
    }
  });

  request({
    url: "/vue/Product/addProduct",
    method: "post",
    data: pg.formVal
  }).then(res => {
    if (res.data.status == 200) {
      pg.$message.success("提交成功");
      pg.$router.push({ path: `lineList` });
    } else {
      pg.$message.error(res.data.message);
      return false;
    }
  });
}

// @@ ==========================================
// @@ S 级别函数
// @@ ==========================================
// @@ 获取缓存
function s_setPreset(pg) {
  let settings = window.localStorage.getItem("settings");
  settings = JSON.parse(settings);
  pg.Initial.Preset = settings.Preset;
}
