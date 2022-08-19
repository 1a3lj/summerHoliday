<template>
  <el-container>
  <el-header>
    
  </el-header>
  <el-container>
   <el-aside>
  <el-row class="tac"><el-col :span="4">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1" @click="watch1()">
         销售趋势分析
      </el-menu-item>
      <el-menu-item index="2" @click="salesArea()">
        销售热点区域
      </el-menu-item>
      <el-menu-item index="3" @click="salesTarget()">
        购车目的
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</el-aside> 
</el-container>
</el-container>
</template>

<script>
import Index from '../components/index.vue'
export default {
  name: 'Home',
  components:{
    Index
  },
  methods:{
    create(){

    },
    watch1(){
      //if (isAuthenticated) {
        this.$router.push('/salesExpect');
      //} else {
       // this.$router.push('/login')
      //}
    },
    salesArea(){
      const _this=this;
      _this.$router.push("/salesArea");
    },
    salesTarget(){
      const _this=this;
      _this.$router.push("/salesTarget");
    }
  }
}
</script>