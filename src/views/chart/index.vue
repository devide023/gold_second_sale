<template>
  <div>
    <div id="gold1" style="width:100%;height:300px"></div>
    <div id="gold2" style="width:100%;height:300px"></div>
    <div id="gold3" style="width:100%;height:300px"></div>
    <div id="gold5" style="width:100%;height:300px"></div>
    <div id="gold6" style="width:100%;height:300px"></div>
    <div id="gold7" style="width:100%;height:300px"></div>
    <div id="gold8" style="width:100%;height:300px"></div>
  </div>
</template>

<script>
import report from "@/api/chart/cruisesdata";
import echart from "echarts";
export default {
  data() {
    return {
      ksrq: "2019-01-01",
      jsrq: "2019-12-31",
      list: null,
      gold1: null,
      gold2: null,
      gold3: null,
      gold5: null,
      gold6: null,
      gold7: null,
      gold8: null,
      option1: {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["销售额"]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: []
          }
        ]
      },
      option2: {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["销售额"]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: []
          }
        ]
      },
      option3: {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["销售额"]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: []
          }
        ]
      },
      option5: {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["销售额"]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: []
          }
        ]
      },
      option6: {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["销售额"]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: []
          }
        ]
      },
      option7: {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["销售额"]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: []
          }
        ]
      },
      option8: {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["销售额"]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.gold1 = echart.init(document.getElementById("gold1"));
    this.gold2 = echart.init(document.getElementById("gold2"));
    this.gold3 = echart.init(document.getElementById("gold3"));
    this.gold5 = echart.init(document.getElementById("gold5"));
    this.gold6 = echart.init(document.getElementById("gold6"));
    this.gold7 = echart.init(document.getElementById("gold7"));
    this.gold8 = echart.init(document.getElementById("gold8"));
    this.echart_data();
  },
  methods: {
    echart_data() {
      this.gold1.showLoading();
        this.gold2.showLoading();
        this.gold3.showLoading();
        this.gold5.showLoading();
        this.gold6.showLoading();
        this.gold7.showLoading();
        this.gold8.showLoading();
      report.echart_cruises(this.ksrq, this.jsrq).then(res => {
        this.list = res.list;
        this.gold1.hideLoading();
        this.gold2.hideLoading();
        this.gold3.hideLoading();
        this.gold5.hideLoading();
        this.gold6.hideLoading();
        this.gold7.hideLoading();
        this.gold8.hideLoading();
        if (this.list.length > 0) {
          this.option1.title.text = "黄金1号各航次销售额";
          this.option1.xAxis.data = this.list
            .filter(function(item, index) {
              return item.cruisesno === "001";
            })
            .map(function(item, index) {
              return item.rcno;
            });
          this.option1.series[0].data = this.list
            .filter((item, index) => {
              return item.cruisesno === "001";
            })
            .map((item, index) => {
              return item.curr;
            });
          this.option2.title.text = "黄金2号各航次销售额";
          this.option2.xAxis.data = this.list
            .filter((item, index) => {
              return item.cruisesno === "002";
            })
            .map((item, index) => {
              return item.rcno;
            });
          this.option2.series[0].data = this.list
            .filter((item, index) => {
              return item.cruisesno === "002";
            })
            .map((item, index) => {
              return item.curr;
            });
          this.option3.title.text = "黄金3号各航次销售额";
          this.option3.xAxis.data = this.list
            .filter((item, index) => {
              return item.cruisesno === "003";
            })
            .map((item, index) => {
              return item.rcno;
            });
          this.option3.series[0].data = this.list
            .filter((item, index) => {
              return item.cruisesno === "003";
            })
            .map((item, index) => {
              return item.curr;
            });
          this.option5.title.text = "黄金5号各航次销售额";
          this.option5.xAxis.data = this.list
            .filter((item, index) => {
              return item.cruisesno === "005";
            })
            .map((item, index) => {
              return item.rcno;
            });
          this.option5.series[0].data = this.list
            .filter((item, index) => {
              return item.cruisesno === "005";
            })
            .map((item, index) => {
              return item.curr;
            });
          this.option6.title.text = "黄金6号各航次销售额";
          this.option6.xAxis.data = this.list
            .filter((item, index) => {
              return item.cruisesno === "006";
            })
            .map((item, index) => {
              return item.rcno;
            });
          this.option6.series[0].data = this.list
            .filter((item, index) => {
              return item.cruisesno === "006";
            })
            .map((item, index) => {
              return item.curr;
            });
          this.option7.title.text = "黄金7号各航次销售额";
          this.option7.xAxis.data = this.list
            .filter((item, index) => {
              return item.cruisesno === "007";
            })
            .map((item, index) => {
              return item.rcno;
            });
          this.option7.series[0].data = this.list
            .filter((item, index) => {
              return item.cruisesno === "007";
            })
            .map((item, index) => {
              return item.curr;
            });
          this.option8.title.text = "黄金8号各航次销售额";
          this.option8.xAxis.data = this.list
            .filter((item, index) => {
              return item.cruisesno === "008";
            })
            .map((item, index) => {
              return item.rcno;
            });
          this.option8.series[0].data = this.list
            .filter((item, index) => {
              return item.cruisesno === "008";
            })
            .map((item, index) => {
              return item.curr;
            });
          this.gold1.setOption(this.option1);
          this.gold2.setOption(this.option2);
          this.gold3.setOption(this.option3);
          this.gold5.setOption(this.option5);
          this.gold6.setOption(this.option6);
          this.gold7.setOption(this.option7);
          this.gold8.setOption(this.option8);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
