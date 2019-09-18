import { NULL } from 'node-sass';
<template>
  <div>
    <div class="querybar">
      <el-input v-model="query.key" placeholder="关键字" size="small" style="width:150px;"></el-input>
      <el-input v-model="query.title" placeholder="名称" size="small" style="width:150px;"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="menuadd">添加</el-button>
      <el-button type="primary" icon="el-icon-arrow-up" size="small" @click="uplevel">上级</el-button>
    </div>
    <el-table :data="list">
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==0?'danger':''">{{scope.row.status|statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编码">
        <template slot-scope="scope">
          <router-link :to="{path:'/sysmgr/menuindex?pid='+scope.row.id}">{{scope.row.code}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="功能简码">
        <template slot-scope="scope">{{ scope.row.menucode }}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">{{scope.row.menutype|menutypeName}}</template>
      </el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <svg-icon
            v-if="scope.row.icon!==null"
            :icon-class="scope.row.icon"
            style="font-size:30px;"
          ></svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="权重" prop="seq"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="录入日期">
        <template slot-scope="scope">{{scope.row.add_time|formatedate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="add_submenu(scope.row)">添加</el-button>
            <el-button type="text" size="small" @click="edit_menu(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="remove_menu(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogtitle" top="20px" :visible.sync="dialogshow">
      <el-form :model="form">
        <el-form-item label="编码" label-width="80px">
          <el-input v-model="form.code" placeholder="菜单编码"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-select v-model="form.menutype" placeholder>
            <el-option
              v-for="item in menutype_list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.menutype===3" label="功能简码" label-width="80px">
          <el-input
            v-model="form.menucode"
            placeholder="add,del,query,edit..."
            readonly
            @click.native="dialog_authority=true"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="form.title" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.pid!==0" label="父项菜单" label-width="80px">
          <el-select v-model="form.pid" placeholder="选择父级菜单" style="width:100%">
            <el-option v-for="item in all_menus" :key="item.id" :value="item.id">{{ item.title }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.menutype!==3" label="图标" label-width="80px">
          <el-input v-model="form.icon" placeholder="选择图标" @click.native="chooseicons"></el-input>
        </el-form-item>
        <el-form-item v-if="form.menutype!==3" label="路径" label-width="80px">
          <el-select v-if="isedit" v-model="form.path" placeholder="请选择路由" style="width:100%;">
            <el-option
              v-for="(item,index) in route_list"
              :key="index"
              :value="item.path"
            >{{item.path+'\t'+item.name}}</el-option>
          </el-select>
          <el-input v-else v-model="form.path" placeholder="请输入路径"></el-input>
        </el-form-item>
        <el-form-item v-if="form.menutype===2" label="视图" label-width="80px">
          <el-select v-model="form.viewpath" placeholder="请选视图组件" style="width:100%;">
            <el-option v-for="(item,index) in vuefiles" :key="index" :value="item">{{ item }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重" label-width="80px">
          <el-input v-model="form.seq" placeholder="权重值大的会排在后面"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogshow = false">取消</el-button>
        <el-button v-if="form.id===0" type="primary" @click="submit_menudata">确定</el-button>
        <el-button v-if="form.id>0" type="primary" @click="save_menudata">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="图标选择" top="20px" :visible.sync="iconsshow">
      <icon-choose @choosed_icon="choosed_icons"></icon-choose>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="iconsshow=false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限编码选择" top="20px" :visible.sync="dialog_authority">
      <el-radio-group v-model="authdata.code">
        <el-radio
          v-for="(item,index) in authority_cods"
          :key="index"
          :label="item.code"
        >{{item.title}}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btn_select_authcode">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addmenu,
  menulist,
  rootlist,
  editmenu,
  delmenu,
  menucode
} from "@/api/menumgr/index";
import iconslist from "@/components/choose/chooseicons";
import { menutypes, get_apis, get_authoritycodes } from "@/api/base/baseinfo";
import { root_routelist, vuecomponents } from "@/utils/tool";
let _this = {};
export default {
  components: {
    "icon-choose": iconslist
  },
  data() {
    return {
      dialogtitle: "新增菜单",
      list: [],
      isedit: false,
      apilist: [],
      menutype_list: [],
      route_list: [],
      recordcount: 0,
      dialogshow: false,
      iconsshow: false,
      dialog_authority: false,
      all_menus: [],
      vuefiles: [],
      authority_cods: [],
      authdata: {
        code: "",
        title: ""
      },
      query: {
        pagesize: 50,
        pageindex: 1,
        key: "",
        code: "",
        title: ""
      },
      form: {
        id: 0,
        title: "",
        code: "",
        menucode: "",
        pid: 0,
        icon: "",
        path: "",
        status: 1,
        menutype: 1,
        seq: 0,
        viewpath: "layout/index"
      },
      options: [{ value: 1, label: "启用" }, { value: 0, label: "禁用" }],
      level: {
        pid: 0
      }
    };
  },
  created() {
    this.getmenutypes();
    _this = this;
  },
  mounted() {
    if (this.$route.query.pid) {
      this.level.pid = this.$route.query.pid;
    }
    this.rootdata();
    this.route_list = root_routelist(this.$router.options.routes);
    this.get_allmenus();
    this.get_apilist();
    this.get_vuecoms();
    get_authoritycodes().then(res => {
      this.authority_cods = res.list;
    });
  },
  methods: {
    getdata() {
      menulist(this.query).then(res => {
        this.recordcount = res.recordcount;
        this.list = res.list;
      });
    },
    get_apilist() {
      get_apis().then(res => {
        this.apilist = res.list.map(item => {
          return item.url;
        });
      });
    },
    get_allmenus() {
      menulist({ pageindex: 1, pagesize: 655350 }).then(res => {
        this.all_menus = res.list.filter(item => {
          return item.menutype !== 3;
        });
      });
    },
    getmenutypes() {
      menutypes().then(res => {
        this.menutype_list = res.list;
      });
    },
    rootdata() {
      rootlist(this.level.pid).then(res => {
        this.list = res.list;
      });
    },
    get_vuecoms() {
      vuecomponents().then(res => {
        this.vuefiles = res.comlist;
        this.vuefiles.push("/");
      });
    },
    submit_menudata() {
      addmenu(this.form).then(res => {
        this.query.pageindex = 1;
        this.dialogshow = false;
        this.rootdata();
      });
    },
    save_menudata() {
      editmenu(this.form).then(res => {
        this.dialogshow = false;
        this.rootdata();
      });
    },
    pagechange(val) {
      this.query.pageindex = val;
    },
    search() {
      this.query.pid = this.level.pid;
      menulist(this.query).then(res => {
        this.list = res.list;
        this.query.pageindex = 1;
      });
    },
    menuadd() {
      this.dialogshow = true;
      this.isedit = false;
      menucode(0).then(res => {
        this.form.code = res.menucode;
      });
      this.form.id = 0;
      this.form.pid = 0;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    edit_menu(row) {
      this.dialogtitle = "编辑菜单项";
      this.isedit = true;
      this.form.id = row.id;
      this.form.pid = row.pid;
      this.form.path = row.path;
      this.form.status = row.status;
      this.form.icon = row.icon;
      this.form.title = row.title;
      this.form.code = row.code;
      this.form.menucode = row.menucode;
      this.form.menutype = row.menutype;
      this.form.seq = row.seq;
      this.form.viewpath = row.viewpath;
      this.authdata.code = row.menucode;
      this.authdata.title = row.title;
      this.dialogshow = true;
    },
    add_submenu(row) {
      this.isedit = false;
      menucode(row.id).then(res => {
        this.form.code = row.code + res.menucode;
      });
      this.form.id = 0;
      this.form.pid = row.id;
      this.form.path = "";
      this.form.status = 1;
      this.form.icon = "";
      this.form.title = "";
      this.form.menucode = "";
      this.form.menutype = "";
      this.form.seq = 10;
      this.dialogshow = true;
    },
    view_submenu(row) {
      this.level.pid = row.id;
      this.rootdata();
    },
    uplevel() {
      this.$router.back();
    },
    chooseicons() {
      this.iconsshow = true;
    },
    choosed_icons(val) {
      this.form.icon = val.icon;
      this.iconsshow = false;
    },
    remove_menu(id) {
      this.$confirm("你确定要删除该菜单及下属子菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delmenu(id).then(res => {
          this.rootdata();
        });
      });
    },
    btn_select_authcode() {
      var data = this.authority_cods.filter(i => {
        return i.code === this.authdata.code;
      });
      this.form.menucode = data[0].code;
      this.form.title = data[0].title;
      this.dialog_authority = false;
    }
  },
  filters: {
    menutypeName: function(val) {
      const list = _this.menutype_list.filter(item => {
        return item.id === val;
      });
      if (list.length > 0) {
        return list[0].title;
      } else {
        return val;
      }
    }
  }
};
</script>
<style scoped>
.querybar {
  padding: 5px;
}
</style>