import request from "@/utils/request";

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 初始化数据
export function i_initData() {
  return {
    ProductName: "",
    loading: false,
    dialogVisible: false,
    tableData: [],
    turnPage: [],
    curPage: 1,
    perPage: 30,
    totalNum: 0,
    Search: {
      PriceID: "",
      PriceTip: ""
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
    ProductID: pg.$route.params.ProductID,
    TQID: pg.$route.params.TQID,
    PerPage: pg.perPage,
    CurPage: pg.curPage
  };
  if (pg.Search.PriceID !== "") {
    data.PriceID = pg.Search.PriceID;
  }
  if (pg.Search.PriceTip !== "") {
    data.PriceTip = pg.Search.PriceTip;
  }
  request({
    url: "/Shop/price/turnPage",
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
  pg.Search.PriceID = "";
  pg.Search.PriceTip = "";
  l_loadData(pg);
}

// @@ ==========================================
// @@ S 级别函数
// @@ ==========================================
