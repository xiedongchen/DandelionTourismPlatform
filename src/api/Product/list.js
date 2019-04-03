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
    turnPage: [],
    curPage: 1,
    perPage: 30,
    totalNum: 0,
    tableData: [],
    Search: {
      ProductID: "",
      SortID: [],
      SupplierID: "",
      ProductName: ""
    },
    Initial: {
      AreaArr: [],
      Company: []
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
// export function i_initSettings(pg) {
//   s_setPreset(pg);
// }

// @@ ==========================================
// @@ L 级别函数
// @@ ==========================================
// @@　加载数据
export function l_loadData(pg) {
  console.log(pg.$store.getters.userInfo.ComID);
  pg.loading = true;
  let data = {
    UserID: "123",
    ComID: "1",
    PerPage: pg.perPage,
    CurPage: pg.curPage
  };
  if (pg.Search.ProductID !== "") {
    data.ProductID = pg.Search.ProductID;
  }

  if (pg.Search.SortID.length == 2) {
    data.SortID = pg.Search.SortID[1];
  }

  if (pg.Search.SupplierID !== "") {
    data.SupplierID = pg.Search.SupplierID;
  }

  if (pg.Search.ProductName !== "") {
    data.ProductName = pg.Search.ProductName;
  }
  request({
    url: "/Shop/Productguide/turnPage",
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
export function c_doObtained(pg, PGID) {
  pg.loading = true;
  request({
    url: "/Shop/Productguide/IsDelproductguide",
    method: "post",
    data: {
      PGID: PGID
    }
  }).then(res => {
    if (res.data.status == 200) {
      pg.$message.success(res.data.message);
      pg.loading = false;
      l_loadData(pg);
    } else {
      pg.$message.error(res.data.message);
      pg.loading = false;
      return false;
    }
  });
}

// @@ 刷新
export function c_doRefresh(pg) {
  pg.Search.ProductID = "";
  pg.Search.SortID = [];
  pg.Search.SupplierID = "";
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

// @@ 搜索
export function c_doSearch(pg) {
  if (
    pg.Search.ProductID == "" &&
    pg.Search.SortID == [] &&
    pg.Search.SupplierID == "" &&
    pg.Search.ProductName == ""
  ) {
    pg.$message.error("请选择查询条件");
    return false;
  }
  pg.curPage = 1;
  l_loadData(pg);
}

// @@ ==========================================
// @@ S 级别函数
// @@ ==========================================
// @@ 获取缓存
// function s_setPreset(pg) {
//   let settings = window.localStorage.getItem("settings");
//   settings = JSON.parse(settings);
//   pg.Initial.AreaArr = settings.Preset.AreaArr.AreaArr;
// }
