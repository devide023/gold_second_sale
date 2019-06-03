<template>
  <div>
    <div id="gold_class" style="width:100%;height:800px;"></div>
  </div>
</template>

<script>
import report from "@/api/chart/cruisesdata";
import chart from "echarts";
export default {
  data() {
    return {
      ksrq: "2019-01-01",
      jsrq: "2019-12-31",
      gold_class: null,
      list: [],
      cruiseslist: [],
      placelist: [],
      jelist: [],
      option: {
        title: {
          text: "各邮轮站点销售对比图",
          link:'/reports/index',
          subtext: "统计截止时间：2019-01-01至2019-12-31",
          textAlign: "center",
          left:'10%'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          top:'8%',
          data: []
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid:{
          top:'20%'
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      }
    };
  },
  methods: {
    getdata() {
      report.echart_cruises_class(this.ksrq, this.jsrq).then(result => {
        this.gold_class.hideLoading();
        this.list = result.list;
        this.cruiseslist = result.cruiseslist;
        this.placelist = result.placelist;
        this.jelist = result.jelist;
        this.option.legend.data = this.placelist.map(item => {
          return item.placename;
        });
        this.option.xAxis[0].data = this.cruiseslist.map(item => {
          return item.cruisesname;
        });
        this.option.series = this.jelist;
        this.gold_class.setOption(this.option);
      });
    }
  },
  mounted() {
    this.gold_class = chart.init(document.getElementById("gold_class"));
    this.gold_class.showLoading();
    this.getdata();
  }
};
</script>

<style scoped>
</style>