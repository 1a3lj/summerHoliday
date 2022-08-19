<template>
    <div class="Login_content" >
        <!--  登录块  -->
        <h2>用户登录</h2>
         <!-- 表单区域 -->
        <!--账号：<input class="login-input" type="text"  v-model="id" placeholder="请输入账号" ref="userId"><br>-->
        <!--密码：<input class="login-input" type="password" v-model="pwd" placeholder="请输入密码" ref="userPwd"><br>-->
		 <el-form :model="loginForm"  :rules="rules" ref="loginForm" label-width="140px">
         <el-form-item label="账号" prop="id">
             <el-input  v-model="loginForm.id" placeholder="请输入账号" type="text"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="pwd">
             <el-input v-model="loginForm.pwd" placeholder="请输入密码" type="password"  show-password></el-input>
         </el-form-item>
         
          <el-form-item label="验证码" prop="code">
         <el-row :span="24">
            <el-col :span="13">
              <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" size=""
                        ></el-input>
                        
            </el-col>
            <el-col :span="11">
              <div class="login-code" width="100%" @click="refreshCode">
                <!--验证码组件-->
                <Identify :identifyCode="identifyCode"></Identify>
              </div>
            </el-col>
           </el-row> 
             </el-form-item>


         <el-form-item>
             <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
             <el-button @click="resetForm('loginForm')">重置</el-button>
             <el-button @click="register()">没有账号？点击注册</el-button>
             <el-button @click="managerlogin()">管理员登录</el-button>
         </el-form-item>
     </el-form>
    </div>
</template>


<script>
    import Identify from '../components/identify'
    import axios from 'axios'
    import store from '../components/state.vue';
    export default{
        name:"Login",
        data(){
            return {   
                loginForm:{
                        id:'',
                        pwd:'',
                        code:''
                },
                 identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机串内容
                 identifyCode: '',
                 rules: {
                    id: [{ required: true, message: "请输入账号", trigger: "blur" }   ],
                    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
                    code: [{ required: true, message: "请点击右边的图片并输入图片中的验证码", trigger: "blur" }]
                       }
            }
        },
        components: { Identify },	//写在export default{}中与data同级表示使用组件
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 1, max: 100, message: '1-100个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 100, message: '1-100个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 1, max: 100, message: '1-100个字符', trigger: 'blur' }
          ],
        },
        methods:{ 
              // 重置验证码
             refreshCode () {
                        this.identifyCode = ''
                        this.makeCode(this.identifyCodes, 4)
                            },
             makeCode (o, l) {
                for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
                     }
                   },
            randomNum (min, max) {
                return Math.floor(Math.random() * (max - min) + min)
                },

            created() {
                // 初始化验证码
                  this.identifyCode = ''
                  this.makeCode(this.identifyCodes, 4)
                  },
                  mounted() {
                    this.identifyCode = ''
                    this.makeCode(this.identifyCodes, 4)
                  },

            submitForm() {
                this.$refs[formName].validate((valid) => {
                    const _this = this;
                    axios.post('http://localhost:8080/user/login',_this.loginForm).then(res=>{
                            if(res.data=="success"){
                                axios.get('http://localhost:8080/denglu.json').then(function (resp){
                                    console.log(resp.data);
                                    _this.$message({
                                    showClose: true,
                                    message: "欢迎,"+resp.data.name,
                                    type: 'success'
                                    });
                                    sessionStorage.setItem("user",resp.data.name);
                                    sessionStorage.setItem("userid",resp.data.id);
                                    sessionStorage.setItem("islogin",true);
                                    store.commit('updatename',sessionStorage.getItem("user"));
                                    store.commit('updateislogin',sessionStorage.getItem("islogin"));
                                    //console.log(this.$store.state.islogin);
                                    //console.log(this.$store.state.loginName);
                                    _this.$router.push("/index");
                                })
                                
                            }else{
                                this.$message.error('错误的账号/密码')
                            }
                    //   this.$router.replace('www.baidu.com')[Vue Router warn]: No match found for location with path应该是要一个本地路由的吧
                    }).catch(error=>{
                            this.$message({
                            type: 'info',
                            message: "请求错误"
                            });
                    })
                })
            },
            register(){
                const _this = this;
                _this.$router.push("/userregister");
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            managerlogin(){
                const _this = this;
                _this.$router.push("/managerlogin");
            }
        }
    }
   
</script>

<style scoped>

</style>
