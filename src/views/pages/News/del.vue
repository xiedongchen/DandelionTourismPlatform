<template>
  <div id="lineList">
    <el-card class="box-card">
      <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" size="mini">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="编号" width="55"></el-table-column>
        <el-table-column prop="name" label="父级栏目" width="100"></el-table-column>
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="name" label="缩略图" width="60">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-picture" circle size="mini" @click></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="组图" width="60">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-picture" circle size="mini" @click></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="排序" width="100"></el-table-column>
        <el-table-column prop="name" label="操作" width="150"  align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'lineList',
  data() {
    return {
      dialogForm: {},
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>


<style scope>
p {
  padding: 0;
  margin: 0;
}
.main {
  padding: 0 0 20px 20px;
}
</style>
