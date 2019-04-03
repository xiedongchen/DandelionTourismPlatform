<template>
  <div id="lineList">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <el-input v-model="Search.ProductNameShow" placeholder="请输入线路名称" size="small" style="width: 200px; margin-right: 10px;"></el-input>
        <el-input v-model="Search.Title" placeholder="请输入团期" size="small" style="width: 200px; margin-right: 10px;"></el-input>
        <el-select v-model="Search.TuanqiTypeShow" placeholder="请选择状态" size="small" style="width: 200px; margin-right: 10px;">
          <el-option v-for="item in Initial.TuanqiType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" size="small" icon="el-icon-search" @click="doSearch">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="doRefresh">重置</el-button>
      </div>
      <el-table ref="multipleTable" border stripe :data="tableData" tooltip-effect="dark" style="width: 100%" size="small">
        <el-table-column prop="TQID" label="编号" width="70" fixed></el-table-column>
        <el-table-column prop="ProductNameShow" label="线路名称" width="250"></el-table-column>
        <el-table-column prop="Title" label="团期" width="150"></el-table-column>
        <el-table-column prop="DateGo" label="出发时间" width="120"></el-table-column>
        <el-table-column label="批发价" width="150">
          <template slot-scope="scope">
            共有
            <span style="color: #409EFF;">{{ scope.row.PriceNum }}</span> 条报价
            <el-button type="text" size="mini" @click="$router.push({ name: 'linePrice', params: { ProductID: $route.params.id, TQID: scope.row.TQID } })">- 查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="StoreNum" label="开团人数" width="100"></el-table-column>
        <el-table-column label="已报名人数" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.SupplierpayNum }}</span>人 -
            <el-button type="text" size="mini">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="已收款人数" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.SupplierpayMany }}</span>人 -
            <el-button type="text" size="mini">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="Receivable" label="应收总额" width="150"></el-table-column>
        <el-table-column prop="PaidAdvance" label="实收总额 " width="150"></el-table-column>
        <el-table-column prop="TuanqiTypeShow" label="状态" width="150"></el-table-column>
        <el-table-column label="操作" width="310" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="doOpendialogVisible(scope.row.TQID)">收人</el-button>
            <el-button type="warning" size="mini" @click="dialogVisible = true">已成团</el-button>
            <el-button type="primary" size="mini" @click="dialogVisible = true">已出发</el-button>
            <el-button type="danger" size="mini" @click="dialogVisible = true">归档</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin: 15px 0; float: right;" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-size="perPage" :total="totalNum"></el-pagination>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <el-form ref="formVal" :model="formVal" label-width="80px" v-loading="loading2">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="姓名">
                <el-input v-model="formVal.TouristName"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="性别">
                <el-radio-group v-model="formVal.TouristSex">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="来源">
                <el-input placeholder="请输入内容" v-model="formVal.Source" fclass="input-with-select">
                  <el-select v-model="formVal.select" slot="append" placeholder="请选择" style="width: 130px;">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="应收金额">
                <el-input-number v-model="formVal.Receivable" :min="1" label="描述文字"></el-input-number>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="预收金额">
                <el-input-number v-model="formVal.PaidAdvance" :min="1" label="描述文字"></el-input-number>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="预收时间">
                <el-date-picker v-model="formVal.PaidAdvanceTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="剩余金额">
                <el-input-number v-model="formVal.shengyuMey" :min="1" label="描述文字"></el-input-number>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="电话">
                <el-input v-model="formVal.TouristTel"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="计调">
                <el-input placeholder="请输入内容" v-model="formVal.Adjustment" class="input-with-select">
                  <el-select v-model="formVal.select" slot="append" placeholder="请选择" style="width: 130px;">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="操作员">
                <el-input placeholder="请输入内容" v-model="formVal.Operators" class="input-with-select">
                  <el-select v-model="formVal.select" slot="append" placeholder="请选择" style="width: 130px;">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="负责人">
                <el-input placeholder="请输入内容" v-model="formVal.Director" class="input-with-select">
                  <el-select v-model="formVal.select" slot="append" placeholder="请选择" style="width: 130px;">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="导游">
                <el-input placeholder="请输入内容" v-model="formVal.Guide" class="input-with-select">
                  <el-select v-model="formVal.select" slot="append" placeholder="请选择" style="width: 130px;">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="支付类型">
                <el-select v-model="Search.ProductName" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in Initial.TuanqiType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="备注">
                <el-input type="textarea" :rows="4" v-model="formVal.Remarks"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="text-align: center;">
              <el-button type="success" @click="doAddGroup" size="small">提交</el-button>
              <el-button type="text" size="small">取消</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { i_initData, i_initSettings, l_loadData,  c_doRefresh, c_doAddGroup } from '@/api/Group/list'
// const initData = i_initData()
// export default {
//   name: 'lineList',
//   data() {
//     return initData
//   },
//   created() {
//     this.doInitSettings()
//     this.doLoadData()
//   },
//   methods: {
//     //@@ 初始化预设
//     doInitSettings() {
//       i_initSettings(this)
//     },
//     //@@ 加载
//     doLoadData() {
//       l_loadData(this)
//     },
//     // 刷新
//     doRefresh() {
//       c_doRefresh(this)
//     },
//     // 搜索
//     doSearch() {
//       this.curPage = 1
//       l_loadData(this)
//     },
//     // 打开弹窗
//     doOpendialogVisible(TQID) {
//       this.formVal.TQID = TQID
//       this.dialogVisible = true
//     },
//     //@@ 添加
//     doAddGroup() {
//       c_doAddGroup(this)
//     },
//     // 分页数据
//     handleCurrentChange(val) {
//       this.curPage = val
//       l_loadData(this)
//     }
//   }
// }
</script>


<style scope>
.el-input-number {
  width: 100%;
}
</style>
