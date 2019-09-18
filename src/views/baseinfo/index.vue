<template>
  <div class="content">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="权限编码" name="first">
        <el-button type="primary" size="small" @click="add_authoritycode">增加</el-button>
        <el-table :data="authcodes" border stripe class="auth_table">
          <el-table-column label="NO." prop="id"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{ scope.row.status|statusName }}</template>
          </el-table-column>
          <el-table-column label="编码" prop="code"></el-table-column>
          <el-table-column label="名称" prop="title"></el-table-column>
          <el-table-column label="日期" prop="add_time"></el-table-column>
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-setting" style="font-size:16px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="edit_auth(scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="disabel_auth(scope.row)">禁用</el-dropdown-item>
                  <el-dropdown-item @click.native="enabel_auth(scope.row)">启用</el-dropdown-item>
                  <el-dropdown-item @click.native="del_auth(scope.row.id)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="菜单类型" name="second">
        <el-table :data="menutypes" border stripe>
          <el-table-column label="NO." prop="id"></el-table-column>
          <el-table-column label="编码" prop="typecode"></el-table-column>
          <el-table-column label="名称" prop="title"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="权限编码" :visible.sync="authshow">
      <el-form :model="authform">
        <el-form-item label="编码" label-width="80px">
          <el-input v-model="authform.code" placeholder="请输入权限编码"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="authform.title" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit_authcode">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_authoritycodes,
  menutypes,
  addauthcode,
  editauthcode,
  delauthcode
} from "@/api/base/baseinfo";
export default {
  data() {
    return {
      activeName: "first",
      authcodes: [],
      menutypes: [],
      authform: {
        id: 0,
        code: "",
        title: "",
        status: 1
      },
      authshow: false
    };
  },
  mounted() {
    this.get_authcodes();
    this.get_menutypes();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    get_authcodes() {
      get_authoritycodes().then(res => {
        this.authcodes = res.list;
      });
    },
    get_menutypes() {
      menutypes().then(res => {
        this.menutypes = res.list;
      });
    },
    add_authoritycode() {
      this.authshow = true;
      this.authform.id = 0;
      this.authform.code = '';
      this.authform.title = '';
      this.authform.status = 1;
    },
    submit_authcode() {
      if (this.authform.id === 0) {
        addauthcode(this.authform).then(res => {
          this.authshow = false;
          this.get_authcodes();
        });
      } else {
        editauthcode(this.authform).then(res => {
          this.authshow = false;
          this.get_authcodes();
        });
      }
    },
    edit_auth(data) {
      this.authshow = true;
      this.authform.id = data.id;
      this.authform.code = data.code;
      this.authform.title = data.title;
      this.authform.status = data.status;
    },
    del_auth(id) {
      this.$confirm("你确定要删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delauthcode(id).then(res => {
          this.get_authcodes();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    },
    disabel_auth(data) {
      this.authform.id = data.id;
      this.authform.code = data.code;
      this.authform.title = data.title;
      this.authform.status = 0;
      this.submit_authcode();
    },
    enabel_auth(data) {
      this.authform.id = data.id;
      this.authform.code = data.code;
      this.authform.title = data.title;
      this.authform.status = 1;
      this.submit_authcode();
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 5px 10px 0px 10px;
}
.auth_table {
  margin-top: 5px;
}
</style>