<template>
  <div class="query_bar">
    <el-date-picker
      v-model="ksrq"
      type="date"
      placeholder="开始日期"
      value-format="yyyy-MM-dd"
      size="small"
      class="datecss"
    ></el-date-picker>
    <el-date-picker
      v-model="jsrq"
      type="date"
      placeholder="结束日期"
      value-format="yyyy-MM-dd"
      size="small"
      class="datecss"
    ></el-date-picker>
    <el-select v-model="cruisesno" placeholder="请选择邮轮" size="small">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button type="primary" @click="querydata" size="small" icon="el-icon-search">查询</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ksrq: "",
      jsrq: "",
      cruisesno:'',
      options: [
          {
          value: "",
          label: "--全部--"
        },
        {
          value: "001",
          label: "黄金1号"
        },
        {
          value: "002",
          label: "黄金2号"
        },
        {
          value: "003",
          label: "黄金3号"
        },
        {
          value: "005",
          label: "黄金5号"
        },
        {
          value: "006",
          label: "黄金6号"
        },
        {
          value: "007",
          label: "黄金7号"
        },
        {
          value: "008",
          label: "黄金8号"
        }
      ]
    };
  },
  methods: {
    querydata() {
      this.$emit("query_bar_click", { ksrq: this.ksrq, jsrq: this.jsrq });
    }
  }
};
</script>

<style scoped>
.query_bar {
  padding: 5px;
}
.datecss {
  width: 140px;
}
</style>