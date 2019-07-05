<template>
  <div>
    <el-dialog title="图标选择" top="20px" :visible.sync="showDialog">
      <ul class="icon_contain">
        <li v-for="(item,index) in list" :key="index" @click="icon_choosed(item)">
          <i :class="item"></i>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
      </div>
    </el-dialog>
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
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
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