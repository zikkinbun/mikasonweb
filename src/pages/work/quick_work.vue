<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="快速执行" name="first">
      <div class="tabContainer">
        <el-form ref="formItem" :model="formItem" label-width="80px">
          <el-form-item label="脚本名称">
            <el-input v-model="formItem.name"></el-input>
          </el-form-item>
          <el-form-item label="执行用户">
            <el-input v-model="formItem.user"></el-input>
          </el-form-item>
          <el-form-item label="目标主机">
            <el-input v-model="formItem.target"></el-input>
          </el-form-item>
          <el-form-item label="执行参数">
            <el-input v-model="formItem.params"></el-input>
          </el-form-item>
        </el-form>
        <div class="radio">
          <label class="radio-label">脚本来源</label>
        <el-radio-group v-model="radio" @change="upload">
          <el-radio :label="3">手工录入</el-radio>
          <el-radio :label="6">本地上传</el-radio>
          <el-radio :label="9">服务器上传</el-radio>
        </el-radio-group>
      </div>
      </div>
      <label class="rtf-label" v-show="editor_show">在线编辑</label>
      <div class="rtf-content" v-show="editor_show">
        <quill-editor ref="Editor" v-model="content" :config="editorOption"　@change="onEditorChange($event)"></quill-editor>
      </div>
      <label class="rtf-label" v-show="upload_show">上传脚本</label>
      <div class="upload">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          v-show="upload_show">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-tab-pane>
    <el-tab-pane label="数据脚本" name="second">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor';
  export default {
    data () {
      return {
        activeName: 'first',
        formItem: {
          'name': '',
          'user': '',
          'target': '',
          'data': '',
          'params': ''
        },
        upload_show: false,
        editor_show: true,
        radio: 3,
        content: '',
        editorOption: {}
      }
    },
    components: {
      quillEditor
    },
    methods: {
      upload: function () {
        let selected = this.radio;
        switch(selected) {
          case 3:
            this.editor_show = true;
            this.upload_show = false;
            break;
          case 6:
            this.editor_show = false;
            this.upload_show = true;
            break;
        }
      },
      handleClick: function (tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style>
  .form {
    width: 50%;
  }
  .tabContainer {
  		margin-top: 10px;
      margin-left: 50px;
      margin-right: 550px;
      margin-bottom: 10px;
  }
  .rtf-content {
    height: 400px;
    width: 952px;
    margin-left: 130px;
    margin-right: 100px;
  }
  .rtf-label {
    height: 400px;
    margin-left: 62px;
    font-size: 14px;
  }
  .radio-label {
    margin: 25px 30px 20px 13px;
    font-size: 14px;
  }
  .radio {
    margin: 25px 100px 20px 0px;
  }
  .upload {
    margin-left: 150px;
    margin-right: 100px;
  }
</style>
