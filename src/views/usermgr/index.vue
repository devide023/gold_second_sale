import { formatDate } from '../../utils/datetool';
<template>
  <div>
    <div class="querybar">
      <el-input v-model="key" placeholder="请输入姓名" size="small" style="width:150px;"></el-input>
      <el-input v-model="code" placeholder="请输入用户代号" size="small" style="width:150px;"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="adduser">添加用户</el-button>
      <el-button type="warning" icon="el-icon-close" size="small" @click="disdel">禁用</el-button>
      <el-button type="success" icon="el-icon-check" size="small" @click="enabel">启用</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="remove">删除</el-button>
    </div>
    <el-table :data="list" @selection-change="handleSelectionChange">
      >
      <el-table-column type="selection" width="55" show-overflow-tooltip></el-table-column>
      <el-table-column label="状态" width="70">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===1">{{scope.row.status|statusName}}</el-tag>
          <el-tag type="danger" v-if="scope.row.status===0">{{scope.row.status|statusName}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="代号" prop="usercode" width="80"></el-table-column>
      <el-table-column label="姓名" prop="username" width="150"></el-table-column>
      <el-table-column label="性别" width="80">
        <template slot-scope="scope">{{scope.row.sex===1?"男":"女"}}</template>
      </el-table-column>
      <el-table-column label="出生日期" width="150">
        <template slot-scope="scope">{{scope.row.birthday|formatedate}}</template>
      </el-table-column>
      <el-table-column label="电话" prop="tel" width="150"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="useredit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="userrole(scope.row)">角色</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="recordcount"
      :current-page="pageindex"
      :page-size="pagesize"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 50, 100, 200]"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next"
    ></el-pagination>
    <el-dialog title="新增用户" top="20px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户代号" label-width="80px">
          <el-input v-model="form.usercode"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input type="password" v-model="form.userpwd"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="80px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="80px">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" label-width="80px">
          <el-input type="tel" v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" label-width="80px">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="通讯地址" label-width="80px">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit_userdata">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userlist, adduser, deluser, disabeluser } from "@/api/usermgr/user";
export default {
  data() {
    return {
      key: "",
      code: "",
      list: [],
      pageindex: 1,
      pagesize: 50,
      recordcount: 0,
      dialogFormVisible: false,
      form: {
        usercode: "",
        username: "",
        userpwd: "",
        status: 1,
        tel: "",
        birthday: "",
        sex: "1",
        address: ""
      },
      multipleSelection: []
    };
  },
  mounted() {
    this.getadata();
  },
  methods: {
    getadata() {
      userlist(this.key, this.code, this.pageindex, this.pagesize).then(res => {
        this.list = res.list;
        this.recordcount = res.recordcount;
      });
    },
    adduser() {
      this.dialogFormVisible = true;
    },
    disdel() {
      if (this.multipleSelection.length > 0) {
        const ids = [];
        this.multipleSelection.forEach(item => {
          ids.push(item.id);
        });
        disabeluser(ids, 0).then(res => {
          this.getadata();
        });
      }
      else{
        this.$notify.info({
          title: '操作提示',
          message: '请选择要操作的项！'
        });
      }
    },
    enabel(){
      if (this.multipleSelection.length > 0){
        const ids = [];
        this.multipleSelection.forEach(item => {
          ids.push(item.id);
        });
        disabeluser(ids, 1).then(res => {
          this.getadata();
        });
      }
      else{
        this.$notify.info({
          title: '操作提示',
          message: '请选择要操作的项！'
        });
      }
    },
    remove() {
      if (this.multipleSelection.length > 0) {
        const ids = [];
        this.multipleSelection.forEach(item => {
          ids.push(item.id);
        });
        deluser(ids).then(res => {
          console.log(res);
          this.getadata();
        });
      }else{
        this.$notify.info({
          title: '操作提示',
          message: '请选择要操作的项！'
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    submit_userdata() {
      adduser(this.form).then(res => {
        this.dialogFormVisible = false;
        this.pageindex = 1;
        this.getadata();
      });
    },
    query() {
      this.getadata();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.pageindex = 1;
      this.getadata();
    },
    handleCurrentChange(val) {
      this.pageindex = val;
      this.getadata();
    },
    show_menu() {
      this.show_dropdown_menu = true;
    },
    useredit(row) {
      console.log(row);
    },
    userrole(row) {
      console.log(row);
    }
  }
};
</script>

<style scoped>
.querybar {
  padding: 5px;
}
</style>