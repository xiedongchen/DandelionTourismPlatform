import request from "@/utils/request";

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 初始化数据
export function i_initData() {
  return {
    dialogVisibleThumb: false,
    dialogVisibleFile: false,
    dialogVisibleThumbUrl: "",
    loading: false,
    dialogForm: {},
    deleteAll: "",
    turnPage: [],
    curPage: 1,
    perPage: 30,
    totalNum: 0,
    tableData: [],
    Search: {
      AreaArr: [],
      SortID: ""
    },
    Initial: {
      AreaArr: []
    },
    FileData: {
      File: "",
      File2: "",
      File3: "",
      File4: ""
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
  pg.loading = true;
  let data = {
    ComID: "661",
    IsDel: "0",
    UserID: "123",
    PerPage: pg.perPage,
    CurPage: pg.curPage
  };
  if (pg.Search.ProductID !== "") {
    data.ProductID = pg.Search.ProductID;
  }

  if (pg.Search.AreaArr.length == 2) {
    data.SortID = pg.Search.SortID;
  }

  if (pg.Search.ProductName !== "") {
    data.ProductName = pg.Search.ProductName;
  }
  request({
    url: "/vue/Product/turnPage",
    method: "post",
    data: data
  }).then(res => {
    res = res.data;
    if (res.status == 200) {
      pg.tableData = res.TurnPage;
      pg.curPage = res.CurPage;
      pg.totalNum = parseInt(res.NumAll);
      pg.loading = false;
    } else {
      pg.$message.error(res.message);
      pg.tableData = [];
      pg.totalNum = 0;
      pg.loading = false;
    }
  });
}

// @@ ==========================================
// @@ C 级别函数
// @@ ==========================================
// @@ 下架
export function c_doObtained(pg, ProductID) {
  request({
    url: "/vue/Product/IsDelProduct",
    method: "post",
    data: {
      ProductID: ProductID
    }
  }).then(res => {
    if (res.data.status == 200) {
      pg.$message.success(res.data.message);
      l_loadData(pg);
    } else {
      pg.$message.error(res.data.message);
      return false;
    }
  });
}

// @@ 刷新
export function c_doRefresh(pg) {
  pg.Search.ProductID = "";
  pg.Search.AreaArr = [];
  pg.Search.ProductName = "";
  l_loadData(pg);
}

// @@ 打开图片
export function c_doOpenThumb(pg, Thumb) {
  pg.dialogVisibleThumb = true;
  pg.dialogVisibleThumbUrl = Thumb;
}

// @@ 打开附件
export function c_doOpenFile(pg, row) {
  pg.dialogVisibleFile = true;
  pg.FileData.File = row.File;
  pg.FileData.File2 = row.File2;
  pg.FileData.File3 = row.File3;
  pg.FileData.File4 = row.File4;
}

// @@ ==========================================
// @@ S 级别函数
// @@ ==========================================
// @@ 获取缓存
function s_setPreset(pg) {
  let settings = window.localStorage.getItem("settings");
  settings = JSON.parse(settings);
  pg.Initial.AreaArr = settings.Preset.AreaArr.AreaArr;
}
