<template>
  <div>
    <div class="querybar">
      <el-date-picker
        v-model="ksrq"
        type="date"
        value-format="yyyy-MM-dd"
        size="small"
        placeholder="开始日期"
      ></el-date-picker>
      <el-date-picker
        v-model="jsrq"
        type="date"
        value-format="yyyy-MM-dd"
        size="small"
        placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="small" @click="get_cruises_income">查询</el-button>
    </div>
    <div id="gold_date" style="width:100%;height:600px"></div>

    <el-dialog :title="dialogtitle" :visible.sync="dialogVisible">
      <el-table
        :data="dialogdetail"
        :border="true"
        :stripe="true"
        :show-summary="true"
        :default-sort="{prop: 'curr', order: 'descending'}"
        :summary-method="getSummaries"
      >
        <el-table-column label="航次编号" width="150">
          <template slot-scope="scope">
            <a
              :href="'/cruisesmgr/rcdetail?rcno='+scope.row.rcno"
              style="color:#409EFF;"
              target="_self"
            >{{scope.row.rcno}}</a>
          </template>
        </el-table-column>
        <el-table-column property="curr" label="销售额" sortable width="200"></el-table-column>
        <el-table-column property="guestcnt" label="人数" sortable></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import report from "@/api/chart/cruisesdata";
import { currentdate, currentyearfirst } from "@/utils/datetool";
import echart from "echarts";
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      dialogdetail: [],
      dialogtitle: "",
      sum_je: 0,
      sum_guest_cnt: 0,
      ksrq: "2019-01-01",
      jsrq: "2019-12-31",
      gold_date: null,
      options: {
        title: {
          text: "各邮轮销售统计",
          left: "10",
          subtext: "",
          top: "20",
          bottom: "20"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: "20",
          left: "10",
          data: []
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["30%", "55%"],
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.gold_date = echart.init(document.getElementById("gold_date"));
    this.ksrq = currentyearfirst();
    this.jsrq = currentdate();
    this.get_cruises_income();
    this.gold_date.on("click", "series", this.seriesclick);
  },
  methods: {
    get_cruises_income() {
      report.echart_cruises_income(this.ksrq, this.jsrq).then(res => {
        this.list = res.list;
        if (this.list.length > 0) {
          var s = this.list.map((item, index) => {
            return { value: item.total_amount, name: item.name };
          });
          this.options.legend.data = this.list.map((item, index) => {
            return item.name;
          });
          this.options.series[0].data = s;
          this.options.title.subtext =
            "统计时段:" + this.ksrq + "至" + this.jsrq;
          this.gold_date.setOption(this.options);
        }
      });
    },
    cruises_saledetail(cruisesno) {
      report
        .echart_cruises_rcsale(this.ksrq, this.jsrq, cruisesno)
        .then(res => {
          this.dialogdetail = res.list;
          this.sum_guest_cnt = res.list
            .map(item => {
              return item.guestcnt;
            })
            .reduce((a, b) => {
              return a + b;
            });
          this.sum_je = res.list
            .map(item => {
              return item.curr;
            })
            .reduce((a, b) => {
              return a + b;
            })
            .toFixed(2);
          this.dialogtitle =
            this.list
              .filter(item => {
                return item.cruisesno === cruisesno;
              })
              .map(item => {
                return item.name;
              })[0] + "各航次销售明细";
          this.dialogVisible = true;
        });
    },
    getSummaries(param) {
      const sums = [];
      sums[0] = "合计：";
      sums[2] = this.sum_guest_cnt;
      sums[1] = this.sum_je;
      return sums;
    },
    seriesclick(param) {
      const item = this.list[param.dataIndex];
      this.cruises_saledetail(item.cruisesno);
    }
  }
};
</script>

<style scoped>
.querybar {
  padding: 5px;
}
</style>