<template>
  <div class="button1" >
    <el-form-item>
        <el-button @click="sale()">销售趋势分析</el-button>
        <el-button style="margin-left: 100px" @click="purpose()">购车目的</el-button>
        <el-button style="margin-left: 100px" @click="hotspot()">销售热点</el-button>
    </el-form-item>
  </div>
  <div class="button" >
    <el-form-item>
        <el-button class="bt1"
        @click="exit()">返回</el-button>
    </el-form-item>
  </div>
</template>

<script>

export default {
    name:'Whole',
  methods: {
     exit(){
      const _this = this;
      _this.$router.push("/catalog");
    },
    sale () {
      this.$router.push({path: '/sale'})
    },
    purpose () {
      this.$router.push({path: '/purpose'})
    },
    hotspot () {
      this.$router.push({path: '/hotspot'})
    }
  }
}
</script>

<style>
    .contianer {
        /* 让内部设置了 position 的元素相对于此元素定位 */
        position: relative;
        /* 父级内容最好滚动条，而不是任由内容撑开 */
        max-height: 300px;
        overflow-y: auto;
    }
    .button1 {
        /* 相对父级定位，处于父级的右下角，距离右边30px、底部50px的位置 */
        position: absolute;
        right: 500px;
        bottom: 300px;
    }
 .botton {
  min-width: 100%;
    height: 40px;
    position: relative;
    display:flex;
    justify-content:flex-end;
}
.bt1 {
  position: relative;
  right: 100px;
  top: 250px;
}
    
</style>