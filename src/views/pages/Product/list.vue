<template>
  <div id="lineList">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <el-input v-model="Search.ProductID" placeholder="请输入编号" size="small" style="width:200px; margin-right: 10px;" clearable></el-input>
        <el-cascader placeholder="请选择线路分类" :options="Initial.AreaArr" v-model="Search.SortID" clearable size="small" style="margin-right: 10px;"></el-cascader>
        <el-select v-model="Search.SupplierID" placeholder="请选择供应商" size="small" style="margin-right: 10px;" clearable>
          <el-option v-for="item in Initial.Company" :key="item.ComID" :label="item.Company" :value="item.ComID"></el-option>
        </el-select>
        <el-input v-model="Search.ProductName" placeholder="请输入线路名称" size="small" style="width:300px; margin-right: 10px;" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="doSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="doRefresh">刷新</el-button>
      </div>
      <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%" size="mini">
        <el-table-column prop="ProductID" label="编号" width="70"></el-table-column>
        <el-table-column prop="SortShow" label="线路分类" width="150"></el-table-column>
        <el-table-column prop="ComName" label="供应商" width="150"></el-table-column>
        <el-table-column prop="ProductName" label="线路名称"></el-table-column>
        <el-table-column label="团期" width="150">
          <template slot-scope="scope">
            共有
            <span style="color: #409EFF;">{{ scope.row.TuanqiNum }}</span> 个团期 -
            <el-button type="text" size="mini" @click="$router.push({ path: `/Group/groupList/${scope.row.ProductID}` })">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="缩略图" width="60" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-picture" @click="doOpenThumb(scope.row.Thumb)"></el-button>
            <el-dialog :visible.sync="dialogVisibleThumb">
              <img width="100%" :src="dialogVisibleThumbUrl">
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="原文件" width="60" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-tickets" @click="doOpenFile(scope.row)"></el-button>
            <el-dialog :visible.sync="dialogVisibleFile" width="20%">
              <a href="###" :download="FileData.File">附件一</a>
              <br>
              <a href="###" :download="FileData.File2">附件二</a>
              <br>
              <a href="###" :download="FileData.File3">附件三</a>
              <br>
              <a href="###" :download="FileData.File4">附件四</a>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="doObtained(scope.row.PGID)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin: 15px 0; float: right;" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-size="perPage" :total="totalNum"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  i_initData,
  // i_initSettings,
  l_loadData,
  c_doSearch,
  c_doObtained,
  c_doRefresh,
  c_doOpenThumb,
  c_doOpenFile
} from '@/api/Product/list'
const initData = i_initData()
export default {
  name: 'lineList',
  data() {
    return initData
  },
  created() {
    // this.doInitSettings()
    this.doLoadData()
  },
  methods: {
    // //@@ 初始化预设
    // doInitSettings() {
    //   i_initSettings(this)
    // },
    //@@ 加载
    doLoadData() {
      l_loadData(this)
    },
    // 搜索
    doSearch() {
      c_doSearch(this)
    },
    // 刷新
    doRefresh() {
      c_doRefresh(this)
    },
    // 分页数据
    handleCurrentChange(val) {
      this.curPage = val
      l_loadData(this)
    },
    // 打开缩略图
    doOpenThumb(Thumb) {
      c_doOpenThumb(this, Thumb)
    },
    // 打开原文件
    doOpenFile(row) {
      c_doOpenFile(this, row)
    },
    // 下架
    doObtained(PGID) {
      c_doObtained(this, PGID)
    }
  }
}
</script>
