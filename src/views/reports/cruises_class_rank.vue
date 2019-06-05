<template>
  <div class="report_class_rank">
    <query-bar @query_bar_click="querydata"></query-bar>
    <el-table :data="tabledata" border style="width: 100%">
      <el-table-column prop="typename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="je" label="销售额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import rep from "@/api/reports/report";
import QueryBar from '@/components/QueryBar/querybar';
import {currentdate,currentmonthfirst} from '@/utils/datetool';
export default {
  components: {
    'query-bar':QueryBar
  },
  data() {
    return {
      ksrq: "",
      jsrq: "",
      cruisesno:'',
      tabledata: []
    };
  },
  created() {
    this.ksrq = currentmonthfirst();
    this.jsrq = currentdate();
    this.getdata();
  },
  methods: {
    getdata() {
      rep.cruises_class_rank(this.ksrq, this.jsrq,this.cruisesno).then(res => {
        this.tabledata = res.list;
      });
    },
    querydata(data){
      this.ksrq = data.ksrq;
      this.jsrq = data.jsrq;
      this.cruisesno = data.cruisesno;
      this.getdata();
    }
  }
};
</script>

<style scoped>
.report_class_rank{
  padding-left: 5px;
  padding-right: 5px;
}
</style>