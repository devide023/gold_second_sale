<template>
  <div>
      <div></div>
    <div id="gold_date" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import report from "@/api/chart/cruisesdata";
import echart from "echarts";
export default {
  data() {
    return {
      list: null,
      ksrq: "2019-01-01",
      jsrq: "2019-12-31",
      gold_date: null,
      options: {
        title: {
          text: "各邮轮销售统计",
          left: 'center',
          subtext:'统计时段：2019-01-01至2019-12-31'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: []
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.gold_date = echart.init(document.getElementById("gold_date"));
    this.get_cruises_income();
  },
  methods: {
    get_cruises_income() {
      report.echart_cruises_income(this.ksrq, this.jsrq).then(res => {
        this.list = res.list;
        if (this.list.length > 0) {
            var s = this.list.map((item, index) => {
              return { value: item.total_amount,name: item.name};
            });
          this.options.legend.data=this.list.map((item,index)=>{return item.name});
          this.options.series[0].data = s;
          this.gold_date.setOption(this.options);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>