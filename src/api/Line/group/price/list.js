import request from "@/utils/request";

// @@ ==========================================
// @@ I 初始化数据
// @@ ==========================================
// @@ 初始化数据
export function i_initData() {
  return {
    ProductName: "",
    loading: false,
    loading2: false,
    dialogVisible: false,
    onOff: "",
    width: "150",
    tableData: [],
    turnPage: [],
    curPage: 1,
    perPage: 30,
    totalNum: 0,
    IsDel: 0,
    Search: {
      PriceID: "",
      PriceTip: ""
    },
    dialogForm: {
      ProductID: "",
      TQID: "",
      PriceTip: "",
      Price3: "",
      Price2: "",
      Price: "",
      Remark: ""
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
  pg.dialogForm.ProductID = pg.$route.params.ProductID;
  pg.dialogForm.TQID = pg.$route.params.TQID;
  pg.loading2 = true;
  let data = {
    ProductID: pg.$route.params.ProductID,
    TQID: pg.$route.params.TQID,
    PerPage: pg.perPage,
    CurPage: pg.curPage,
    IsDel: pg.IsDel
  };

  if (pg.Search.PriceID !== "") {
    data.PriceID = pg.Search.PriceID;
  }
  if (pg.Search.PriceTip !== "") {
    data.PriceTip = pg.Search.PriceTip;
  }

  request({
    url: "/vue/price/turnPage",
    method: "post",
    data: data
  }).then(res => {
    res = res.data;
    if (res.status == 200) {
      pg.tableData = res.TurnPage;
      pg.ProductName = res.ProductName;
      pg.curPage = res.CurPage;
      pg.totalNum = parseInt(res.NumAll);
      pg.loading2 = false;
    } else {
      pg.tableData = [];
      pg.ProductName = res.ProductName;
      pg.totalNum = 0;
      pg.loading2 = false;
    }
  });
}

// @@　加载原始数据
export function l_getEditData(pg, PriceID) {
  pg.loading = true;
  request({
    url: "/vue/price/show",
    method: "post",
    data: {
      PriceID: PriceID
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
      url: "/vue/price/addPrice",
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
      url: "/vue/price/updatePrice",
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

// @@ 添加or编辑
export function c_doOpenPrice(pg, Switch, PriceID) {
  if (Switch == "add") {
    pg.onOff = "add";
    pg.dialogVisible = true;
    pg.dialogForm.PriceTip = "";
    pg.dialogForm.Price3 = "";
    pg.dialogForm.Price2 = "";
    pg.dialogForm.Price = "";
    pg.dialogForm.Remark = "";
  } else {
    pg.onOff = "edit";
    pg.dialogVisible = true;
    l_getEditData(pg, PriceID);
  }
}

// @@ 刷新
export function c_doRefresh(pg) {
  pg.IsDel = 0;
  pg.Search.PriceID = "";
  pg.Search.PriceTip = "";
  pg.width = "150";
  l_loadData(pg);
}

// @@ 回收站
export function c_getDelData(pg) {
  pg.IsDel = 1;
  pg.curPage = 1;
  pg.width = "90";
  pg.Search.PriceID = "";
  pg.Search.PriceTip = "";
  l_loadData(pg);
}

// @@ 上下架
export function c_doDeleteOrRecovery(pg, PriceID, num) {
  pg.loading2 = true;
  if (num == "1") {
    request({
      url: "/vue/price/IsDelPrice",
      method: "post",
      data: {
        PriceID: PriceID
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
      url: "/vue/price/regainPrice",
      method: "post",
      data: {
        PriceID: PriceID
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
