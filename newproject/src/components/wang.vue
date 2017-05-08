<template>
  <div>
    <div class="header">
      <div>this is template body</div>
    </div>
    <br><br>
    <el-switch
      v-model="value1"
      on-text=""
      off-text="">
    </el-switch>
    <el-switch
      v-model="value2"
      on-color="#13ce66"
      off-color="#ff4949">
    </el-switch>
    <br><br>
    <el-upload
      class="upload-demo"
      action="/uploadImg?small=true"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="successFile"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <br><br>
    <el-date-picker
      v-model="value3"
      size="small"
      :editable='editable'
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    <br><br>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm2.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
    body{
        background-color:#ff0000
    }
    .demo-ruleForm{
        max-width: 600px;
        margin: 0 auto
    }
</style>
<script>
    import Vue from 'vue'
    import { Button } from 'element-ui'
    import { Switch   } from 'element-ui'
    import { Upload } from 'element-ui'
    import { DatePicker  } from 'element-ui'
    import { Form } from 'element-ui'
    import { Input } from 'element-ui'
    import { FormItem } from 'element-ui'
    Vue.use(Button )
    Vue.use(Switch )
    Vue.use(Upload )
    Vue.use(DatePicker)
    Vue.use(Form )
    Vue.use(Input )
    Vue.use(FormItem )
    export default{
        data() {
          var checkAge = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('年龄不能为空'));
              }
              setTimeout(() => {
                if (!Number.isInteger(value)) {
                  callback(new Error('请输入数字值'));
                } else {
                  if (value < 18) {
                    callback(new Error('必须年满18岁'));
                  } else {
                    callback();
                  }
                }
              }, 1000);
          };
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return {
            value1: true,
            value2: true,
            editable:false,
            value3:'',
            fileList: [],
            ruleForm2: {
              pass: '',
              checkPass: '',
              age: ''
            },
            rules2: {
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
              age: [
                { validator: checkAge, trigger: 'blur' }
              ]
            }
          };
        },
        methods: {
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          },
          successFile(data){
            console.log(data)
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
    }

</script>
