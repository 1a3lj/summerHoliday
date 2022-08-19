<template>
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
      <el-menu-item index="1" @click="gotoSalesCom">
        销量对比
      </el-menu-item>
      <el-menu-item index="2" @click="gotoTargetCom()">
        指标对比
      </el-menu-item>
      <el-menu-item index="3" @click="gotoOilCom()">
        油耗对比
      </el-menu-item>
      <el-menu-item index="4" @click="gotoPriceCom()">
        价格对比
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>

<script>

export default {
  name: 'Home',
  methods:{
    create(){

    },
    gotoSalesCom(){
      //if (isAuthenticated) {
        this.$router.push('/salesCom');
      //} else {
       // this.$router.push('/login')
      //}
    },
    gotoTargetCom(){
      const _this=this;
      _this.$router.push("/targetCom");
    },
    gotoOilCom(){
      const _this=this;
      _this.$router.push("/oilCom");
    },
    gotoPriceCom(){
      const _this=this;
      _this.$router.push("/priceCom");
    }
  }
}
</script>