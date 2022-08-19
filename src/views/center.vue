<template>
<div id="building">
</div>
<div class="button" >
    <el-form-item>
        <el-button class="bt1"
        @click="checkin()">点击登录汽车大数据系统
      </el-button>
    </el-form-item>
  </div>
 
</template>
  
<style>
#building{
background:url("../assets/p3.webp");
width:100%;			
height:100%;	
position:fixed;
background-size:100% 100%;}
.button {
  min-width: 100%;
    height: 40px;
    position: relative;
    display:flex;
    justify-content:flex-end;
}

</style>


<script>
export default {
  name:"center",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    checkin(){
      const _this = this;
      _this.$router.push("/login");
  },
  }
};
</script>


