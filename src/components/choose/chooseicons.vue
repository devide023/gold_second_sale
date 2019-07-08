<template>
  <div>
    <el-row>
      <el-col :span="24">
        <ul class="icon_contain">
          <li v-for="(item,index) in list" :key="index" @click="icon_choosed(item)">
            <i :class="item"></i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_icons } from "@/api/base/baseinfo";
export default {
  data() {
    return {
      list: [],
      iconname: ""
    };
  },
  mounted() {
    this.get_data();
  },
  methods: {
    get_data() {
      get_icons().then(res => {
        this.list = res.list;
      });
    },
    icon_choosed(icon) {
      this.iconname = icon;
      this.$emit("choosed_icon", { icon: this.iconname });
    }
  }
};
</script>

<style lang="scss" scoped>
.icon_contain {
  list-style: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  display: block;
}
.icon_contain li {
  margin: 5px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  float: left;
  font-size: 32px;
  cursor: pointer;
}
</style>