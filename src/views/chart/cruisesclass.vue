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
      option: {
        title: {
          text: "分类销售堆叠区域图",
          subtext: "统计截止时间：2019-01-01至2019-12-31",
          textAlign: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: []
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  methods: {
    getdata() {
      report.echart_cruises_class(this.ksrq, this.jsrq).then(result => {
        this.list = result.list;
        var l = new Set(
          this.list.map((item, index) => {
            return item.placeno + item.placename;
          })
        );
        this.option.legend.data = [...l];
        this.option.xAxis[0].data = [
          ...new Set(
            this.list.map((item, index) => {
              return item.cruisesname;
            })
          )
        ];
        this.option.series = this.setseriesdata();
        this.gold_class.setOption(this.option);
      });
    },

    setseriesdata() {
      var cruiseslist = new Set(
        this.list.map((item, index) => {
          return {
            placeno: item.placeno,
            cruisesno: item.cruisesno,
            cruisesname: item.cruisesname
          };
        })
      );
      var sdata = [];
      cruiseslist.forEach((item, index) => {
        var tempdata = [];
        var placeno_list = [...cruiseslist].filter((sitem, index) => {
          return sitem.placeno === item.placeno;
        });
        placeno_list.forEach((sitem, index) => {
          tempdata.push(
            this.list
              .filter(t => {
                return (
                  t.placeno === sitem.placeno && t.cruisesno === item.cruisesno
                );
              })
              .map((t)=>{return t.je})
              .reduce((a, b, c, d) => {
                return (a +=b);
              })
          );
        });
        sdata.push({
          name: item.cruisesname,
          type: "line",
          stack: "销量",
          data: tempdata
        });
      });
      return sdata;
    }
  },
  mounted() {
    this.gold_class = chart.init(document.getElementById("gold_class"));
    this.getdata();
  }
};
</script>

<style scoped>
</style>