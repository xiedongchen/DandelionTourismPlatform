<template>
  <div id="groupList">
    <el-card class="box-card" style="margin-bottom: 10px;">
      <el-input v-model="Search.TQID" placeholder="请输入编号" size="small" style="width:200px; margin-right: 10px;"></el-input>
      <el-input v-model="Search.Title" placeholder="请输入团期" size="small" style="width:200px; margin-right: 10px;"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="doSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="doRefresh">刷新</el-button>
    </el-card>
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>{{ ProductName }}</span>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-table :data="tableData" border style="width: 100%" size="mini">
              <el-table-column prop="TQID" label="编号" width="100"></el-table-column>
              <el-table-column prop="Title" label="团期"></el-table-column>
              <el-table-column label="批发价" width="140">
                <template slot-scope="scope">
                  共有 {{ scope.row.PriceNum }} 条报价 -
                  <el-button type="text" size="mini" :disabled="scope.row.IsDel == '1'" @click="$router.push({ name: 'priceList', params: { ProductID: $route.params.id, TQID: scope.row.TQID } })">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="StoreNum" label="开团人数" width="80" align="center"></el-table-column>
              <el-table-column prop="DateGo" label="出发时间" width="100" align="center"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-pagination style="margin: 15px 0; float: right;" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-size="perPage" :total="totalNum"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { i_initData, l_loadData, c_doSearch, c_doRefresh } from '@/api/Group/list'
const initData = i_initData()
export default {
  name: 'groupList',
  data() {
    return initData
  },
  created() {
    this.doLoadData()
  },
  methods: {
    //@@ 加载
    doLoadData() {
      l_loadData(this)
    },
    //@@  搜索
    doSearch() {
      this.curPage = 1
      l_loadData(this)
    },
    //@@  刷新
    doRefresh() {
      c_doRefresh(this)
    },
    //@@  分页数据
    handleCurrentChange(val) {
      this.curPage = val
      l_initData(this)
    }
  }
}
</script>
