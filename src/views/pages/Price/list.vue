<template>
  <div id="priceList">
    <el-card class="box-card" style="margin-bottom: 10px;">
      <el-input v-model="Search.PriceID" placeholder="请输入编号" size="small" style="width:200px; margin-right: 10px;"></el-input>
      <el-input v-model="Search.PriceTip" placeholder="请输入票型" size="small" style="width:200px; margin-right: 10px;"></el-input>
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
              <el-table-column prop="PriceID" label="编号" width="100"></el-table-column>
              <el-table-column prop="PriceTip" label="票型"></el-table-column>
              <el-table-column prop="Price" label="零售价" width="100" align="center"></el-table-column>
              <el-table-column prop="Price2" label="代理价" width="100" align="center"></el-table-column>
              <el-table-column prop="Price3" label="同行价" width="100" align="center"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-pagination style="margin: 15px 0; float: right;" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-size="perPage" :total="totalNum"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { i_initData, l_loadData, c_doRefresh } from '@/api/Price/list'
const initData = i_initData()
export default {
  name: 'priceList',
  data() {
    return initData
  },
  mounted: function() {
    l_initData(this)
  },
  created() {
    this.doLoadData()
  },
  methods: {
    //@@ 加载
    doLoadData() {
      l_loadData(this)
    },
    // 刷新
    doRefresh() {
      c_doRefresh(this)
    },
    // 搜索
    doSearch() {
      this.curPage = 1
      l_loadData(this)
    },
    // 分页数据
    handleCurrentChange(val) {
      this.curPage = val
      l_initData(this, '0')
    }
  }
}
</script>
