<template>
    <div class="Login_content" >
        <!--  登录块  -->
        <h2>验证管理员身份</h2>
         <!-- 表单区域 -->
        <!--账号：<input class="login-input" type="text"  v-model="id" placeholder="请输入账号" ref="userId"><br>-->
        <!--密码：<input class="login-input" type="password" v-model="pwd" placeholder="请输入密码" ref="userPwd"><br>-->
		 <el-form :model="loginForm"  ref="loginForm" label-width="140px">
         <el-form-item label="账号" prop="name">
             <el-input  v-model="loginForm.name" placeholder="请输入账号" type="text"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="id">
             <el-input v-model="loginForm.id" placeholder="请输入密码" type="password"  show-password></el-input>
         </el-form-item>
         <el-form-item>
             <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
             <el-button @click="resetForm('loginForm')">重置</el-button>
         </el-form-item>
     </el-form>
    </div>
</template>


<script>
import axios from 'axios'
import store from '../components/state.vue';
    export default{
        name:"ManagerLogin",
        data(){
            
            return {
                loginForm:{
                        name:'',
                        id:'',
                }
            }
        },
        methods:{ 
            submitForm() {
                // let params=this.loginForm;
                const _this = this;
                let url='http://localhost:8089/manager/login';
                axios.post('http://localhost:8089/manager/login',this.loginForm).then(res=>{
                        _this.$message({
                        showClose: true,
                        message: '管理员身份验证成功',
                        type: 'success'
                        });
                        sessionStorage.setItem("user","M");
                        sessionStorage.setItem("islogin",'true');
                        store.commit('updatename',sessionStorage.getItem("user"));
                        store.commit('updateislogin',sessionStorage.getItem("islogin"));
                        store.commit('updateismanager',true);
                        console.log(this.$store.state.islogin);
                        console.log(this.$store.state.loginName);
                        _this.$router.push("/management");
                }).catch(error=>{
                        this.$message({
                        type: 'info',
                        message: '管理员身份验证失败'
                        });
                })
             //   var that=this;
             //   this.$refs[formName].validate((valid) => {
               //     if (valid) {
                        //提交成功后要做的事情
                        // alert('submit!');
                 //       console.log(that.ruleForm)
                 //       axios.post('',that.ruleForm).then(function (response) {
                 //           console.log(response);
                  //      })
                  //  } else {
                  //      console.log('error submit!!');
                  //      return false;
                  //  }
               // });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
   
</script>