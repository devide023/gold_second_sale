<template>
  <div class="result">
      <div class="querybar">
          <el-input v-model="rcno" readonly size="small" placeholder="航次编号" style="width:180px"></el-input>
          <el-button type="primary" icon="el-icon-search" size="small" @click="getdata">查询</el-button>
      </div>
    <el-table :data="list" :border="true" :stripe="true">
      <el-table-column property="placename" label="销售点" width="150"></el-table-column>
      <el-table-column property="typename" label="分类" width="200"></el-table-column>
      <el-table-column property="price" label="单价"></el-table-column>
      <el-table-column property="amount" sortable label="数量"></el-table-column>
      <el-table-column property="curr" sortable label="金额"></el-table-column>
      <el-table-column property="name" label="消费者"></el-table-column>
      <el-table-column property="sex" label="性别"></el-table-column>
      <el-table-column property="birthdate" label="生日"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rcsaledetail } from "@/api/reports/saletop";
import { GetQueryString } from "@/utils/tool";
export default {
  data() {
    return {
      list: [],
      rcno: ""
    };
  },
  mounted() {
    const rcno = GetQueryString("rcno");
    if (rcno != null && rcno.toString().length > 0) {
      this.rcno = GetQueryString("rcno");
      this.getdata();
    }
  },
  methods: {
    getdata() {
      rcsaledetail(this.rcno).then(res => {
        this.list = res.list;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row);
      console.log(column);
    }
  }
};
</script>

<style scoped>
.querybar{
    padding: 5px;
}
.result {
  padding: 5px;
}
</style>