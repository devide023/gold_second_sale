<template>
  <div>
    <div class="querybar">
      <el-input v-model="query.key" placeholder="关键字" size="small" style="width:150px;"></el-input>
      <el-input v-model="query.title" placeholder="名称" size="small" style="width:150px;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="menuadd" size="small">添加</el-button>
      <el-button type="primary" icon="el-icon-arrow-up" @click="uplevel" size="small">上级</el-button>
    </div>
    <el-table :data="list">
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==0?'danger':''">{{scope.row.status|statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编码">
        <template slot-scope="scope">
          <a href="#" @click="view_submenu(scope.row)">{{scope.row.code}}</a>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="图标" prop="icon"></el-table-column>
      <el-table-column label="录入日期">
        <template slot-scope="scope">
          {{scope.row.add_time|formatedate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="add_submenu(scope.row)">子菜单</el-button>
            <el-button type="text" size="small" @click="edit_menu(scope.row)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogtitle" top="20px" :visible.sync="dialogshow">
      <el-form :model="form">
        <el-form-item label="编码" label-width="80px">
          <el-input v-model="form.code" placeholder="菜单编码"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="form.title" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" label-width="80px">
          <el-input v-model="form.icon" placeholder></el-input>
        </el-form-item>
        <el-form-item label="路径" label-width="80px">
          <el-input v-model="form.path" placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogshow = false">取消</el-button>
        <el-button v-if="form.id===0" type="primary" @click="submit_menudata">确定</el-button>
        <el-button v-if="form.id>0" type="primary" @click="save_menudata">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addmenu, menulist, rootlist,editmenu,upitem } from "@/api/menumgr/index";
export default {
  data() {
    return {
      dialogtitle:'新增菜单',
      list: [],
      recordcount: 0,
      dialogshow: false,
      pid: 0,
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
        pid: 0,
        icon: "",
        path: "",
        status: 1
      },
      level:{
        pid:0
      }
    };
  },
  mounted() {
    this.rootdata();
  },
  methods: {
    getdata() {
      menulist(this.query).then(res => {
        this.recordcount = res.recordcount;
        this.list = res.list;
      });
    },
    rootdata() {
      rootlist(this.level.pid).then(res => {
        this.list = res.list;
      });
    },
    submit_menudata() {
      addmenu(this.form).then(res => {
        this.query.pageindex = 1;
        this.dialogshow = false;
        this.rootdata();
      });
    },
    save_menudata(){
      editmenu(this.form).then(res=>{
        this.dialogshow=false;
        this.rootdata();
      })
    },
    pagechange(val) {
      this.query.pageindex = val;
    },
    search() {
      this.level.pid=0;
      this.query.pagesize = 1;
      this.rootdata();
    },
    menuadd() {
      this.dialogshow = true;
      this.form.id=0;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    edit_menu(row) {
      console.log(row);
      this.dialogtitle='编辑菜单项';
      this.form.id = row.id;
      this.form.pid=row.pid;
      this.form.path = row.path;
      this.form.status=row.status;
      this.form.icon=row.icon;
      this.form.title=row.title;
      this.form.code=row.code;
      this.dialogshow = true;
    },
    add_submenu(row) {
      this.form.pid = row.id;
      this.dialogshow = true;
    },
    view_submenu(row){
      this.level.pid = row.id;
      this.rootdata();
    },
    uplevel(){
      upitem(this.level.pid).then(res=>{
        this.level.pid = res.entry.pid;
        this.rootdata();
      })
    }
  }
};
</script>

<style scoped>
.querybar {
  padding: 5px;
}
</style>