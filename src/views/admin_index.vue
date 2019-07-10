<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="update_menus">更新菜单</el-button>
        <el-button type="success" @click="route_info">路由信息</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { routelist, root_routelist } from "@/utils/tool";
import { bataddmenu } from "@/api/menumgr/index";
export default {
  data() {
    return {
      list: [],
      query: {}
    };
  },
  mounted() {
    root_routelist(this.$router.options.routes);
    this.list = routelist;
  },
  methods: {
    update_menus() {
        const formdatas=[];
      this.list.forEach((item, index) => {
        const menudata = {};
        menudata.pid = 0;
        menudata.status = 1;
        menudata.code = "00" + String(index);
        menudata.title = item.name;
        menudata.path = item.path;
        formdatas.push(menudata);
      });
      bataddmenu(formdatas).then(res=>{
          console.log(res);
      })
    },
    route_info(){
        console.log(this.$router);
        console.log(this.$route);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>