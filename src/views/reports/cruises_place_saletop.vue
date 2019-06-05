<template>
  <div>
    <query-bar @query_bar_click="query"></query-bar>
    <el-table
      :data="list"
      :default-sort="{prop: 'je', order: 'descending'}"
      border
      style="width: 100%"
    >
      <el-table-column prop="placeno" label="站点编号"></el-table-column>
      <el-table-column prop="placename" label="站点名称"></el-table-column>
      <el-table-column prop="je" sortable label="销售额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { placesaletop } from "@/api/reports/saletop";
import QueryBar from "@/components/QueryBar/querybar";
import { currentdate, currentmonthfirst } from "@/utils/datetool";
export default {
  components: {
    "query-bar": QueryBar
  },
  data() {
    return {
      list: [],
      ksrq: "",
      jsrq: "",
      cruisesno: ""
    };
  },
  mounted() {
    this.ksrq = currentmonthfirst();
    this.jsrq = currentdate();
    this.get_data();
  },
  methods: {
    get_data() {
      placesaletop(this.ksrq, this.jsrq, this.cruisesno).then(res => {
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