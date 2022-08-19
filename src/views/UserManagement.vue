<template>
  <div class="userop" >
    <el-container>
      <el-container>
        <el-form :model="submitForm"  ref="submitForm" label-width="140px">
          <el-form-item label="用户账号" prop="bookName">
            <el-input  v-model="submitForm.bookName" placeholder="请输入用户账号" type="text"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showuser()">查询用户信息</el-button>
            <el-button @click="resetForm('submitForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-container> 
      <el-container>
        <el-scrollbar v-loading="loading">
          <el-table :data="tableData" style="width: 100%" max-height="500">
            <el-table-column prop="id" label="账号" width="120" />
            <el-table-column prop="name" label="昵称" width="300" />
            <el-table-column prop="realname" label="真实姓名" width="300" />
            <el-table-column prop="tel" label="电话号码" width="120" />
            <el-table-column prop="email" label="邮箱地址" width="120" >
            <template #default="scope">
              <el-button @click="borrowBook(scope.row)" type="text" size="small" >删除信息</el-button>
              <el-button @click="returnBook(scope.row)" type="text" size="small" >修改信息</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-container>
      <el-footer>
        
      </el-footer>
    </el-container>
  </div>
</template>

<script>
   import axios from 'axios' 
   import dayjs from 'dayjs'
export default{
        name:"userop",
        data(){
          return {
            bookName:'',
            total: 0,
            loginName:sessionStorage.getItem("user"),
            submitForm:{
              id:'',
              time:'',
              bookid:'',
              readerid:'',
              borrow:''
            },
            tableData: [
            {
              id:'',
              name:'',
              realname:'',
              tel:'',
              email:''
            }],
            loading:true,
          } 
        },
        created(){  
        const _this = this      
        axios.get("http://localhost:8089/book/findAll/1/10").then(function (resp){
            _this.tableData = resp.data.content;
            _this.total = resp.data.totalElements;
           _this.loading = false;
        })

    },
        methods:{ 
            
          getCurrentTime() {//获取当前时间并打印
       var _this = this;
    　　let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1;
    　　let dd = new Date().getDate();
    　　let hh = new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    　　_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    　　return _this.gettime; 
    },
            borrowBook(row) {
              if(this.$store.state.ismanager){
                this.$message({
                  type: 'info',
                  message: "管理员用户不用于借阅/归还书籍，请登出后再试"
                  });
                this.$router.push("/center");
              }
              else if(sessionStorage.getItem("islogin") === "false"){
                this.$message({
                  type: 'info',
                  message: "请先登录！"
                  });
                this.$router.push("/login");
              }else{
                const _this = this;
                this.submitForm.readerid=sessionStorage.getItem("userid");
                this.submitForm.borrow=true;
                this.submitForm.time=this.getCurrentTime();
                this.submitForm.bookid=row.id;
                console.log(_this.submitForm);
                const url='http://localhost:8089/user/borrowBook';
                axios.post('http://localhost:8089/user/borrowBook',this.submitForm).then(res=>{
                  if(res.data=="借书成功"){
                     _this.$message({
                        showClose: true,
                        message: res.data,
                        type: 'success'
                        });
                  }else{
                    this.$message({
                        type: 'error',
                        message: res.data
                        });
                  }
                }).catch(error=>{
                     this.$message({
                        type: 'info',
                        message: "请求失败"
                        });
                })
              }
                
            },
            returnBook(row) {
              if(this.$store.state.ismanager){
                this.$message({
                  type: 'info',
                  message: "管理员用户不用于借阅/归还书籍，请登出后再试"
                  });
                this.$router.push("/center");
              }
              else if(sessionStorage.getItem("islogin") === "false"){
                this.$message({
                  type: 'info',
                  message: "请先登录！"
                  });
                this.$router.push("/login");
              }else{
                const _this = this;
                this.submitForm.readerid=sessionStorage.getItem("userid");
                this.submitForm.borrow=false;
                this.submitForm.time=this.getCurrentTime();
                this.submitForm.bookid=row.id;
                console.log(_this.submitForm);
                let url='http://localhost:8089/user/returnBook';
                axios.post(url,this.submitForm).then(res=>{
                  if(res.data=="还书成功"){
                    _this.$message({
                          showClose: true,
                          message: res.data,
                          type: 'success'
                          });
                  }else{
                    _this.$message({
                          showClose: true,
                          message: res.data,
                          type: 'error'
                          });
                  }
                }).catch(error=>{
                      this.$message({
                          type: 'info',
                          message: error.message
                          });
                      //console.log(error);
                  })
              }
             
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            showuser(){
              let url='http://localhost:8089/book/getit';
              const _this=this;
              _this.loading = true; 
              _this.id=this.submitForm.id;
              if(_this.id){
                 axios({
                    url: 'http://localhost:8089/book/getit',
                    params: {
                      id: this.id
                    }
                })
                .then(response => {
                  _this.tableData = response.data;
                  _this.loading = false;
                  console.log(_this.tableData);
                }, error => {
                  _this.loading = false;
                  _this.total = 0;
                })
              }else{
                _this.loading = false;
                this.$message({
                  type: 'info',
                  message: "查询账号不可为空"
                  });
              }
            },
            exit(){
              this.$router.push("/login")
            },
           
        }     
    }
</script>

<style scoped>
    .layout-container-demo .el-header {
      position: relative;
      background-color: var(--el-color-primary-light-7);
      color: var(--el-text-color-primary);
    }
    .layout-container-demo .el-aside {
      color: var(--el-text-color-primary);
      background: var(--el-color-primary-light-8);
    }
    .layout-container-demo .el-menu {
      border-right: none;
    }
    .layout-container-demo .el-main {
      padding: 0;
    }
    .layout-container-demo .toolbar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      right: 20px;
    }
    .demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
    </style>
