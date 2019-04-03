import request from "@/utils/request";

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 初始化数据
export function i_initData() {
  return {
    dialogForm: {
      ProductID: "",
      UserID: "50",
      DateGo: "",
      Title: "",
      StoreNum: ""
    },
    turnPage: [],
    curPage: 1,
    perPage: 30,
    totalNum: 0,
    dialogVisible: false,
    loading: false,
    loading2: false,
    ProductName: "",
    onOff: "",
    IsDel: "0",
    width: "150",
    tableData: [],
    Search: {
      TQID: "",
      Title: ""
    },
    pickerOptions: {
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }
      ]
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
// @@ L 级别函数
// @@ ==========================================
// @@　加载数据
export function l_loadData(pg) {
  console.log(pg.$store.getters.userInfo)
  pg.dialogForm.ProductID = pg.$route.params.id;
  pg.loading = true;
  let data = {
    ProductID: pg.$route.params.id,
    PerPage: pg.perPage,
    CurPage: pg.curPage,
    IsDel: pg.IsDel
  };

  if (pg.Search.TQID !== "") {
    data.TQID = pg.Search.TQID;
  }
  if (pg.Search.Title !== "") {
    data.Title = pg.Search.Title;
  }

  request({
    url: "/vue/Tuanqi/turnPage",
    method: "post",
    data: data
  }).then(res => {
    res = res.data;
    if (res.status == 200) {
      pg.tableData = res.TurnPage;
      pg.ProductName = res.ProductName;
      pg.curPage = res.CurPage;
      pg.totalNum = parseInt(res.NumAll);
      pg.loading = false;
    } else {
      pg.tableData = [];
      pg.ProductName = res.ProductName;
      pg.totalNum = 0;
      pg.loading = false;
    }
  });
}

// @@　加载原始数据
export function l_getEditData(pg, TQID) {
  pg.loading = true;
  request({
    url: "/vue/Tuanqi/show",
    method: "post",
    data: {
      TQID: TQID
    }
  }).then(res => {
    pg.dialogForm = res.data.Cont;
    pg.loading = false;
  });
}

// @@ ==========================================
// @@ C 级别函数
// @@ ==========================================
// @@ 提交
export function c_doSubmit(pg) {
  pg.loading = true;
  if (pg.onOff == "add") {
    request({
      url: "/vue/Tuanqi/addTuanqi",
      method: "post",
      data: pg.dialogForm
    }).then(res => {
      res = res.data;
      if (res.status == 200) {
        pg.$message.success(res.message);
        pg.loading = false;
        pg.dialogVisible = false;
        l_loadData(pg);
      } else {
        pg.$message.success(res.message);
        pg.loading = false;
        return false;
      }
    });
  } else {
    request({
      url: "/vue/Tuanqi/updateTuanqi",
      method: "post",
      data: pg.dialogForm
    }).then(res => {
      res = res.data;
      if (res.status == 200) {
        pg.$message.success(res.message);
        pg.loading = false;
        pg.dialogVisible = false;
        l_loadData(pg);
      } else {
        pg.$message.success(res.message);
        pg.loading = false;
        return false;
      }
    });
  }
}

// @@ 添加
export function c_doOpenGroup(pg, Switch, TQID) {
  if (Switch == "add") {
    pg.onOff = "add";
    pg.dialogVisible = true;
    pg.dialogForm.Title = "";
    pg.dialogForm.StoreNum = "";
    pg.dialogForm.DateGo = "";
  } else {
    pg.onOff = "edit";
    pg.dialogVisible = true;
    l_getEditData(pg, TQID);
  }
}

// @@ 刷新
export function c_doRefresh(pg) {
  pg.IsDel = "0";
  pg.curPage = 1;
  pg.Search.TQID = "";
  pg.Search.Title = "";
  pg.width = "150";
  l_loadData(pg);
}

// @@ 回收站
export function c_getDelData(pg) {
  pg.IsDel = "1";
  pg.curPage = 1;
  pg.width = "90";
  pg.Search.TQID = "";
  pg.Search.Title = "";
  l_loadData(pg);
}

// @@ 下架
export function c_doDeleteOrRecovery(pg, TQID, num) {
  pg.loading2 = true;
  if (num == "1") {
    request({
      url: "/vue/Tuanqi/IsDelTuanqi",
      method: "post",
      data: {
        TQID: TQID
      }
    }).then(res => {
      res = res.data;
      if (res.status == 200) {
        pg.$message.success(res.message);
        pg.loading2 = false;
        l_loadData(pg);
      } else {
        pg.$message.error(res.message);
        pg.loading2 = false;
        return false;
      }
    });
  } else {
    request({
      url: "/vue/Tuanqi/regainTuanqi",
      method: "post",
      data: {
        TQID: TQID
      }
    }).then(res => {
      res = res.data;
      if (res.status == 200) {
        pg.$message.success(res.message);
        pg.loading2 = false;
        l_loadData(pg);
      } else {
        pg.$message.error(res.message);
        pg.loading2 = false;
        return false;
      }
    });
  }
}
