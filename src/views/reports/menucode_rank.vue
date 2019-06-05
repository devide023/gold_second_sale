<template>
  <div>
    <query-bar @query_bar_click="query"></query-bar>
    <el-table :data="list" :summary-method="totalje" :default-sort = "{prop: 'je', order: 'descending'}" border show-summary style="width: 100%" >
      <el-table-column prop="menuno" sortable label="消费项目编号"></el-table-column>
      <el-table-column prop="menuname" label="消费项目名称"></el-table-column>
      <el-table-column prop="je" sortable label="销售额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { menucodetop } from "@/api/reports/saletop";
import QueryBar from "@/components/QueryBar/querybar";
import {currentdate,currentmonthfirst} from '@/utils/datetool';
export default {
  components: {
    "query-bar": QueryBar
  },
  mounted() {
    this.ksrq = currentmonthfirst();
    this.jsrq = currentdate();
    this.getdata();
  },
  data() {
    return {
      list: [],
      ksrq: "",
      jsrq: "",
      cruisesno: "",
      sumje:0
    };
  },
  methods: {
    getdata() {
      menucodetop(this.ksrq, this.jsrq, this.cruisesno).then(res => {
        this.list = res.list;
        this.sumje = res.list.map(item=>{return item.je}).reduce((a,b,c,d)=>{return a+b;}).toFixed(2);
      });
    },
    query(data) {
      this.ksrq = data.ksrq;
      this.jsrq = data.jsrq;
      this.cruisesno = data.cruisesno;
      this.getdata();
    },
    totalje(param) {
      const sums = [];
      sums[0] = '合计：';
      sums[1] = '--';
      sums[2] = this.sumje;
      return sums;
    }
  }
};
</script>

<style scoped>
</style>