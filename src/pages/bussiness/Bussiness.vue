<template>
<section>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filters.name" placeholder="业务名" size="medium"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" v-on:click="getBussiness">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleAdd">新增业务</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <el-table
  :data="bussiness"
  stripe
  style="width: 100%">
  <el-table-column
    prop="id"
    label="ID"
    width="100px">
  </el-table-column>
  <el-table-column
    prop="name"
    label="业务名"
    width="100px">
  </el-table-column>
  <el-table-column
    prop="type"
    label="类型"
    width="100px">
    <template scope="scope">
        <el-tag
          v-for="tag in tags"
          v-if="tag.value==scope.row.type"
          :type="tag.type"
          close-transition>{{ tag.name }}</el-tag>
    </template>
  </el-table-column>
  <el-table-column
    prop="hostnum"
    label="拥有主机"
    width="180px">
  </el-table-column>
  <el-table-column
    prop="operator"
    label="运维人员"
    width="180px">
  </el-table-column>
  <el-table-column
    prop="productor"
    label="产品经理"
    width="180px">
  </el-table-column>
  <el-table-column
    prop="creator"
    label="创建者"
    width="180px">
  </el-table-column>
  <el-table-column
    label="操作"
    width="300px">
    <template scope="scope">
      <el-button
      size="small"
      type="primary"
      plain
      @click="handleEdit(scope.$index, scope.row)">修改业务</el-button>
      <el-button
      size="small"
      type="danger"
      plain
      @click="handleDelete(scope.$index, scope.row)">删除业务</el-button>
    </template>
  </el-table-column>
  </el-table>

  <el-dialog title="新增业务" :visible.sync="addVisible" :close-on-click-modal="false">
    <el-form :model="addForm" ref="addForm" label-width="80px" :rules="addrules">
      <el-form-item label="模块名" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="tag" placeholder="请选择">
          <el-option
            v-for="tag in tags"
            :key="tag.name"
            :label="tag.name"
            :value="tag.value">
             <span style="float: left">{{ tag.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目ID" prop="projectid">
        <el-input v-model="addForm.projectid" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="运维人员" prop="operatorid">
        <el-select v-model="operator" placeholder="请选择">
          <el-option
            v-for="user in users"
            :key="user.username"
            :label="user.username"
            :value="user.id">
             <span style="float: left">{{ user.username }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品经理" prop="productorid">
        <el-select v-model="productor" placeholder="请选择">
          <el-option
            v-for="user in users"
            :key="user.username"
            :label="user.username"
            :value="user.id">
             <span style="float: left">{{ user.username }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行主机数" prop="hostnum">
        <el-input v-model="addForm.hostnum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="creator">
        <el-input v-model="addForm.creator" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addBussiness" :loading="addLoading">创建</el-button>
        <el-button @click.native="addVisible = false">取消</el-button>
      </div>
  </el-dialog>

  <el-dialog title="修改业务" :visible.sync="editVisible" :close-on-click-modal="false">
    <el-form :model="editForm" ref="editForm" label-width="80px" :rules="editrules">
      <el-form-item label="模块名" prop="name">
        <el-input v-model="editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="tag" placeholder="请选择">
          <el-option
            v-for="tag in tags"
            :key="tag.name"
            :label="tag.name"
            :value="tag.value">
             <span style="float: left">{{ tag.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运维人员" prop="operatorid">
        <el-select v-model="operator" placeholder="请选择">
          <el-option
            v-for="user in users"
            :key="user.username"
            :label="user.username"
            :value="user.id">
             <span style="float: left">{{ user.username }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品经理" prop="productorid">
        <el-select v-model="productor" placeholder="请选择">
          <el-option
            v-for="user in users"
            :key="user.username"
            :label="user.username"
            :value="user.id">
             <span style="float: left">{{ user.username }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editBussiness" :loading="editLoading">提交</el-button>
        <el-button @click.native="editVisible = false">取消</el-button>
      </div>
  </el-dialog>

</section>
</template>

<script>
  export default {
    data () {
      return {
        bussiness: [],
        filters: [],
        operator: '',
        productor: '',
        users: [],
        tag: '',
        tags: [
          { name: '后端服务', value: 1, type: '' },
          { name: '管理后台', value: 2, type: 'success' },
          { name: '前端展示服务', value: 3, type: 'info' },
          { name: '开发组件', value: 4, type: 'warning' },
          { name: '系统组件', value: 5, type: 'danger' }
        ],
        productors: [],
        operators: [],
        projects: [],
        addForm: {
          name: '',
          type: '',
          projectid: '',
          operatorid: '',
          productorid: '',
          hostnum: '',
          creator: ''
        },
        addVisible: false,
        addLoading: false,
        addrules: {
          name: [
            { required: true, message: '请输入业务名', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ],
          operatorid: [
            { required: true, message: '请选择产品经理', trigger: 'blur' }
          ],
          operatorid: [
            { required: true, message: '请选择产品经理', trigger: 'blur' }
          ],

        },
        editForm: {
          id: '',
          name: '',
          operatorid: '',
          productorid: ''
        },
        editVisible: false,
        editLoading: false,
        editrules: {
          name: [
            { required: true, message: '请输入业务名', trigger: 'blur' }
          ],
          operatorid: [
            { required: true, message: '请选择运维人员', trigger: 'blur' }
          ],
          productorid: [
            { required: true, message: '请选择产品经理', trigger: 'blur' }
          ],
        },
        selected_server: {
          id: '',
          name: ''
        }
      }
    },
    mounted () {
      this.getBussiness();
    },
    methods: {
      serverNameSelectionChange: function(val) {
          var self = this;
          self.selected_server.id = val;
      },
      handleAdd: function () {
        var self = this;
        self.addVisible = true;
        self.getUser();
      },
      handleEdit: function (index, row) {
        var self = this;
        self.editVisible = true;
        self.editForm = Object.assign({}, row);
        self.getUser();
      },
      handleEditDetail: function () {
        var self = this;
        self.editDetialVisible = true;
      },
      handleBind: function (index, row) {
        var self = this;
        self.bindVisible = true;
        self.bindForm = Object.assign({}, row);
      },
      handleDelete: function (index, row) {
        var self = this;
        self.$http.post('/Interface/DelBussiness', {
          bussinessid: row.id
        }).then((response) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                'message': '删除成功',
                'type': 'success'
              });
              break;
            default:
              self.$message({
                'message': '删除失败',
                'type': 'error'
              });
          }
        })
      },
      getUser: function() {
        var self = this;
        self.$http.post('/Interface/ListUser', {
        }).then((response) => {
          self.users = response.data.retdata;
        }).then(function(response) {
          console.log(response)
        });
    },
      getBussiness: function() {
        var self = this;
        self.$http.post('/Interface/getBusList', {
        }).then((response) => {
          self.bussiness = response.data.retdata;
        }).then(function(response) {
          console.log(response)
        });
    },
    addBussiness: function() {
      var self = this;
      self.$http.post('/Interface/addBussiness', {
        name: self.addForm.name,
        type: self.tag,
        operatorid: self.addForm.operatorid,
        productorid: self.addForm.productorid,
        hostnum: self.addForm.body.hostnum,
        creator: self.addForm.body.creator
      }).then((response) => {
        self.addLoading = true;
        var data = response.data;
        switch (data.retcode) {
          case 0:
            self.$message({
              'message': '新增成功',
              'type': 'success'
            });
            self.$refs['addForm'].resetFields();
            self.addLoading = false;
            break;
          default:
            self.$message({
              'message': '新增失败',
              'type': 'error'
            });
        }
        self.addVisible = false;
      })
    },
    editBussiness: function() {
      var self = this;
      self.$http.post('/Interface/SetBussiness', {
        bussinessid: self.editForm.id,
        name: self.editForm.name,
        operatorid: self.editForm.operatorid,
        productorid: self.editForm.productorid
      }).then((response) => {
        self.editLoading = true;
        var data = response.data;
        switch (data.retcode) {
          case 0:
            self.$message({
              'message': '修改成功',
              'type': 'success'
            });
            self.$refs['editForm'].resetFields();
            self.editLoading = false;
            break;
          default:
            self.$message({
              'message': '修改失败',
              'type': 'error'
            });
        }
        self.editVisible = false;
      })
    },
  }
}
</script>
