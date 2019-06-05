<template>
  <div>
    <query-bar @query_bar_click="query"></query-bar>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="cruisesname" label="邮轮名称" width="180"></el-table-column>
      <el-table-column prop="rcno" label="航次" width="180"></el-table-column>
      <el-table-column prop="placename" label="销售站点"></el-table-column>
      <el-table-column prop="typename" label="分类"></el-table-column>
      <el-table-column prop="je" label="销售额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import rep from "@/api/chart/cruisesdata";
import querybar from "@/components/QueryBar/querybar";
import {currentdate,currentmonthfirst} from '@/utils/datetool';
export default {
  components: {
    "query-bar": querybar
  },
  data() {
    return {
      ksrq: "",
      jsrq: "",
      cruisesno: "",
      list: []
    };
  },
  mounted() {
    this.ksrq = currentmonthfirst();
    this.jsrq = currentdate();
    this.get_data();
  },
  methods: {
    get_data() {
      rep
        .echart_cruises_class(this.ksrq, this.jsrq, this.cruisesno)
        .then(res => {
          this.list = res.list;
        });
    },
    query(data) {
      this.ksrq = data.ksrq;
      this.jsrq = data.jsrq;
      this.cruisesno = data.cruisesno;
      this.get_data();
    }
  }
};
</script>

<style scoped>
</style>