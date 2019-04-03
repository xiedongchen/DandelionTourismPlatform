import request from "@/utils/request";

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 初始化数据
export function i_initData() {
  return {
    dialogVisible: false,
    loading: false,
    ProductName: "",
    tableData: [],
    turnPage: [],
    curPage: 1,
    perPage: 30,
    totalNum: 0,
    dialogForm: {
      ProductID: "",
      UserID: "50",
      DateGo: "",
      Title: "",
      StoreNum: ""
    },
    Search: {
      TQID: "",
      Title: ""
    }
  };
}

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 加载预设

// @@ ==========================================
// @@ L 级别函数
// @@ ==========================================
// @@　加载数据
export function l_loadData(pg) {
  pg.loading = true;
  let data = {
    ProductID: pg.$route.params.id,
    ComID: "661",
    UserID: "123",
    PerPage: pg.perPage,
    CurPage: pg.curPage
  };
  if (pg.Search.TQID !== "") {
    data.TQID = pg.Search.TQID;
  }

  if (pg.Search.Title !== "") {
    data.Title = pg.Search.Title;
  }
  request({
    url: "/Shop/Tuanqi/turnPage",
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
      pg.ProductName = res.ProductName;
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
// @@ 刷新
export function c_doRefresh(pg) {
  pg.Search.TQID = "";
  pg.Search.Title = "";
  l_loadData(pg);
}

// @@ ==========================================
// @@ S 级别函数
// @@ ==========================================
