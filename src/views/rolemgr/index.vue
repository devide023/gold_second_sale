<template>
  <div>
    <div class="querybar">
      <el-input v-model="query.key" placeholder="关键字" size="small" style="width:150px"></el-input>
      <el-input v-model="query.code" placeholder="编码" size="small" style="width:150px"></el-input>
      <el-select v-model="query.status" placeholder="状态" size="small">
        <el-option
          v-for="item in statuslist"
          :key="item.status"
          :value="item.status"
          :label="item.title"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="getlist" size="small">查询</el-button>
      <el-button type="success" icon="el-icon-plus" @click="add_role" size="small">添加</el-button>
    </div>
    <el-table :data="list">
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status|statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编码" prop="code"></el-table-column>
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">{{scope.row.add_time|formatedate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit_role(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="role_menus(scope.row.id)">功能</el-button>
          <el-button type="text" size="small" @click="role_users(scope.row.id)">用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="recordcount"
      :current-page="query.pageindex"
      :page-size="query.pagesize"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 50, 100, 200]"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next"
    ></el-pagination>
    <el-dialog :title="dialogtitle" :visible.sync="showdialog">
      <el-form :model="form">
        <el-form-item label="编码" label-width="80px">
          <el-input v-model="form.code" placeholder="角色编码"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="form.title" placeholder="角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showdialog = false">取消</el-button>
        <el-button v-if="form.id===0" type="primary" @click="submit_roleform">确定</el-button>
        <el-button v-if="form.id>0" type="primary" @click="modify_roleform">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="功能权限" :visible.sync="showdialog_menu" @opened="menudialog_open">
      <el-tabs type="border-card">
        <el-tab-pane label="功能管理">
          <el-tree
            :data="menulist"
            :props="props"
            show-checkbox
            node-key="id"
            ref="menutree"
            check-strictly
          ></el-tree>
        </el-tab-pane>
        <el-tab-pane label="Api权限">
          <el-collapse>
            <el-collapse-item
              v-for="(item,index) in apilist"
              :title="item.baseurl"
              :key="index"
              :name="item.baseurl"
            >
              <el-checkbox-group v-model="api.apis">
                <el-checkbox
                  v-for="(sub,j) in item.funlist"
                  :key="j"
                  :label="sub.fullurl"
                >{{sub.name}}</el-checkbox>
              </el-checkbox-group>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showdialog_menu = false">取消</el-button>
        <el-button type="primary" @click="submit_rolemenu">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="角色用户"
      :visible.sync="showdialog_user"
      @opened="dialog_user_open"
      :before-close="handleClose"
    >
      <el-table :data="userlist" ref="roleuser" @selection-change="selected_userids">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="代号" prop="usercode"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">{{scope.row.sex===1?'男':'女'}}</template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showdialog_user=false">取消</el-button>
        <el-button type="primary" @click="submit_roleuser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  rolelist,
  addrole,
  delrole,
  editrole,
  saverolemenus,
  getrolemenu,
  getuserbyroleids,
  saveroleusers,
  saveroleapi,
  get_roleapi
} from "@/api/rolemgr/index";
import { StatusList } from "@/utils/status";
import { menutree } from "@/api/menumgr/index";
import { userlist } from "@/api/usermgr/user";
import { get_apis } from "@/api/base/baseinfo";
export default {
  data() {
    return {
      list: [],
      statuslist: [],
      menulist: [],
      userlist: [],
      apilist: [],
      props: {
        label: "title",
        children: "subitems"
      },
      showdialog: false,
      showdialog_menu: false,
      showdialog_user: false,
      dialogtitle: "新增角色",
      recordcount: 0,
      query: {
        key: "",
        code: "",
        status: 1,
        pageindex: 1,
        pagesize: 50
      },
      form: {
        id: 0,
        status: 1,
        code: "",
        title: ""
      },
      api: {
        roleid: 0,
        apis: []
      },
      rolemenuform: {
        roleid: 0,
        menuids: []
      },
      userform: {
        roleid: 0,
        userids: []
      }
    };
  },
  mounted() {
    this.statuslist = StatusList();
    this.getlist();
    this.getmenulist();
    this.getuserlist();
    this.get_api_list();
  },
  methods: {
    getlist() {
      rolelist(this.query).then(res => {
        this.list = res.list;
        this.recordcount = res.recordcount;
      });
    },
    getmenulist() {
      menutree().then(res => {
        const Fn = Function;
        this.menulist = new Fn("return " + res.data)();
      });
    },
    getuserlist() {
      const q = {
        pageindex: 1,
        pagesize: 65535
      };
      userlist(q).then(res => {
        this.userlist = res.list;
      });
    },
    get_api_list() {
      get_apis().then(res => {
        this.apilist = res.list;
      });
    },
    add_role() {
      this.form.id = 0;
      this.showdialog = true;
    },
    submit_roleform() {
      addrole(this.form).then(res => {
        this.getlist();
        this.showdialog = false;
      });
    },
    remove_role() {
      delrole().then(res => {
        this.getlist();
      });
    },
    edit_role(row) {
      this.dialogtitle = "编辑角色";
      this.form.id = row.id;
      this.form.code = row.code;
      this.form.title = row.title;
      this.showdialog = true;
    },
    modify_roleform() {
      editrole(this.form).then(res => {
        this.getlist();
        this.showdialog = false;
      });
    },
    role_menus(roleid) {
      this.rolemenuform.roleid = roleid;
      this.api.roleid = roleid;
      this.showdialog_menu = true;
    },
    role_users(roleid) {
      this.userform.roleid = roleid;
      this.showdialog_user = true;
    },
    handleCurrentChange(val) {
      this.query.pageindex = val;
    },
    handleSizeChange(val) {
      this.query.pagesize = val;
      this.query.pageindex = 1;
    },
    menudialog_open() {
      const roleid = this.rolemenuform.roleid;
      const querydata = [];
      querydata.push(roleid);
      getrolemenu(querydata).then(res => {
        const ckkeys = res.list.map(item => {
          return item.id;
        });
        this.$refs.menutree.setCheckedKeys(ckkeys);
      });
      get_roleapi(roleid).then(res=>{
        this.api.apis = res.list;
      })
    },
    async submit_rolemenu() {
        this.rolemenuform.menuids = this.$refs.menutree.getCheckedKeys();
        await saverolemenus(this.rolemenuform);
        await saveroleapi(this.api);
        this.showdialog_menu = false;
        this.rolemenuform = {};
        this.api.roleid=0;
        this.api.apis=[];
    },
    submit_roleuser() {
      saveroleusers(this.userform).then(res => {
        this.showdialog_user = false;
        this.userform = {};
      });
    },
    selected_userids(rows) {
      const uids = rows.map(item => {
        return item.id;
      });
      this.userform.userids = uids;
    },
    dialog_user_open() {
      const querydata = [];
      querydata.push(this.userform.roleid);
      this.$refs.roleuser.clearSelection();
      getuserbyroleids(querydata).then(res => {
        if (res.list.length > 0) {
          const uids = res.list.map(item => {
            return item.id;
          });
          this.userlist.forEach(item => {
            const l = uids.filter(sitem => {
              return sitem === item.id;
            });
            if (l > 0) {
              this.$refs.roleuser.toggleRowSelection(item);
            }
          });
        } else {
          this.$refs.roleuser.clearSelection();
        }
      });
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.querybar {
  padding: 5px;
}
</style>