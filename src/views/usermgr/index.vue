<template>
  <div>
    <div class="querybar">
      <el-input v-model="key" placeholder="请输入姓名" size="small" style="width:150px;"></el-input>
      <el-input v-model="code" placeholder="请输入用户代号" size="small" style="width:150px;"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="query" v-has="{type:'query'}">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="adduser" v-has="{type:'add'}">添加用户</el-button>
      <el-button type="warning" icon="el-icon-close" size="small" @click="disdel" v-has="{type:'disable'}">禁用</el-button>
      <el-button type="success" icon="el-icon-check" size="small" @click="enabel" v-has="{type:'enable'}">启用</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="remove" v-has="{type:'del'}">删除</el-button>
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
            <el-button type="text" size="small" @click="useredit(scope.row)" v-has="{type:'edit'}">编辑</el-button>
            <el-button type="text" size="small" @click="userrole(scope.row)" v-has="{type:'userrole'}">角色</el-button>
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
    <el-dialog :title="dialogtitle" top="20px" :visible.sync="dialogFormVisible">
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
        <el-form-item label="状态" label-width="80px">
          <el-select v-model="form.status" placeholder="">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
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
        <el-button v-if="form.id===0" type="primary" @click="submit_userdata">确定</el-button>
        <el-button v-if="form.id>0" type="primary" @click="update_userdata">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="用户角色" :visible.sync="dialogshow_role">
      <el-checkbox-group v-model="formuserrole.roleids">
        <el-checkbox v-for="item in rolelist" :key="item.id" :label="item.id">{{item.title}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogshow_role=false">取消</el-button>
        <el-button type="primary" @click="submit_userrole">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { userlist, adduser, deluser, disabeluser,modifyuser,rolebyuids,saveuserroles } from "@/api/usermgr/user";
import {rolelist} from '@/api/rolemgr/index';
export default {
  data() {
    return {
      key: "",
      code: "",
      list: [],
      rolelist:[],
      pageindex: 1,
      pagesize: 50,
      recordcount: 0,
      dialogFormVisible: false,
      dialogshow_role:false,
      form: {
        id:0,
        usercode: "",
        username: "",
        userpwd: "",
        status: "1",
        tel: "",
        birthday: "",
        sex: "1",
        address: ""
      },
      dialogtitle:'新增用户',
      multipleSelection: [],
      formuserrole:{
      userid:0,
      roleids:[]
      }
    };
  },
  mounted() {
    this.getadata();
    this.getrolelist();
  },
  methods: {
    getadata() {
      userlist({key:this.key, user_code:this.code, pageindex:this.pageindex, pagesize:this.pagesize}).then(res => {
        this.list = res.list;
        this.recordcount = res.recordcount;
      });
    },
    getrolelist(){
      const querydata={
        pageindex:1,
        pagesize:655350
      }
      rolelist(querydata).then(res=>{
        this.rolelist = res.list;
      });
    },
    getuserrolelist(uids){
      rolebyuids(uids).then(res=>{
        this.formuserrole.roleids = res.list.map(item=>{return item.id});
      })
    },
    adduser() {
      this.dialogFormVisible = true;
      this.form.id=0;
      this.form.usercode='';
      this.form.username='';
      this.form.userpwd='';
      this.form.status='1';
      this.form.tel='';
      this.form.birthday='';
      this.form.sex='1';
      this.form.address='';
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
    update_userdata(){
      modifyuser(this.form).then(res=>{
        this.getadata();
        this.dialogFormVisible=false;
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
      this.dialogtitle="编辑用户信息";
      this.form.id = row.id;
      this.form.usercode=row.usercode;
      this.form.username=row.username;
      this.form.userpwd=row.userpwd;
      this.form.status=String(row.status);
      this.form.tel=row.tel;
      this.form.birthday=row.birthday;
      this.form.sex=String(row.sex);
      this.form.address=row.address;
      this.dialogFormVisible=true;
    },
    userrole(row) {
      const q=[];
      q.push(row.id);
      this.formuserrole.userid = row.id;
      this.getuserrolelist(q);
      this.dialogshow_role=true;
    },
    submit_userrole()
    {
      saveuserroles(this.formuserrole).then(res=>{
        this.dialogshow_role=false;
      });
    }
  }
};
</script>

<style scoped>
.querybar {
  padding: 5px;
}
</style>