<template>
 <h1>请输入以下信息进行注册</h1>
 <div class="container">
  <div class="Register-wrapper">
   
    <div class="form-wrapper">
        <!--  注册块  -->
         <!-- 表单区域 -->
        <!--账号：<input class="login-input" type="text"  v-model="id" placeholder="请输入账号" ref="userId"><br>-->
        <!--密码：<input class="login-input" type="password" v-model="pwd" placeholder="请输入密码" ref="userPwd"><br>-->
		 <el-form  ref="registerForm" :rules="rules" :model="registerForm"   label-width="150px">
         <el-form-item label="昵称" prop="name">
             <el-input  v-model="registerForm.name" placeholder="请输入昵称" type="text" ></el-input>
         </el-form-item>
         <!--<el-form-item label="账号" prop="id"type="flex" justify="center" align="middle">-->
         <!--    <el-input  v-model="registerForm.id" placeholder="请输入账号" type="text"></el-input>-->
        <!-- </el-form-item>-->
         <el-form-item label="密码" prop="pwd">
             <el-input v-model="registerForm.pwd" placeholder="请输入密码" type="password"  show-password></el-input>
          </el-form-item>

        <el-form-item label="确认密码" prop="re_pwd">
              <el-input v-model="registerForm.re_pwd" placeholder="请再次输入密码" type="password" show-password ></el-input>        
          </el-form-item>  

         <el-form-item>
             <el-button  type="primary" @click="submitForm('registerForm')">注册</el-button>
             <el-button @click="resetForm('registerForm')">重置</el-button>
             <el-button @click="cancel()">取消</el-button>
         </el-form-item>
     </el-form>
    </div>
    </div>
    </div>
</template>


<script>
    import axios from 'axios'
    export default{
        name:"UserRegister",
        data(){
            return {
                registerForm:{
                        name:'',
                        id:'',
                        pwd:'',
                        numberofborrowedbook:0,
                        arrearage:0
                       // re_pwd:''
                },
                rules:{
                    name:[{required: true, message:"请输入昵称",   trigger:"blur"}],
                    //id:[{required: true,message:"请输入账号",   trigger:"blur"}],
                    pwd:[{required: true,message:"请输入密码",   trigger:"blur"}],
                    re_pwd:[{required: true,message:"请再次输入密码", trigger:"blur"}]
                }
            }
        },
        methods:{ 
            submitForm() {
                console.log(this.registerForm);
                
                if(this.registerForm.pwd!=this.registerForm.re_pwd)
                {
                     this.$message({
                            type: 'info',
                            message: '两次输入密码不一致'
                            });
                }
                else{
                    console.log(this.registerForm);
                    const _this = this;
                    let url='http://localhost:8089/user/register';
                    axios.post('http://localhost:8089/user/register',_this.registerForm).then(res=>{
                            _this.$alert(res.data);
                            _this.$router.push("/login");
                        }).catch(error=>{
                            this.$message({
                            type: 'info',
                            message: '注册失败'
                            });
                        })
                }
               // console.log(this.name+this.pwd);
               

               // }
                
            },
            cancel(){
                this.$router.push("/login");
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
   
</script>