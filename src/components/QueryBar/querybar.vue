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
    <el-button type="primary" size="small" icon="el-icon-search" @click="querydata">查询</el-button>
  </div>
</template>

<script>
import {get_cruisesinfo} from "@/api/base/baseinfo";
import {currentdate,currentmonthfirst} from '@/utils/datetool';
export default {
  data() {
    return {
      ksrq: "",
      jsrq: "",
      cruisesno: "",
      options: []
    };
  },
  mounted() {
    this.ksrq = currentmonthfirst();
    this.jsrq = currentdate();
    this.cruisesinfo();
  },
  methods: {
    querydata() {
      this.$emit("query_bar_click", { ksrq: this.ksrq, jsrq: this.jsrq,cruisesno:this.cruisesno });
    },
    cruisesinfo() {
      get_cruisesinfo().then(res => {
        res.list.splice(0,0,{code:'',name:'-请选择邮轮-'});
        this.options = res.list.map(item => {
          return { value: item.code, label: item.name };
        });
      });
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