<template>
    <div class="common-layout">
      <el-container>
        <el-header style="text-align: right; font-size: larger">
            <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#606266"
            text-color="#FFFFFF"
            active-text-color="#ffd04b"
            @select="handleSelect"
            >
              <el-menu-item index="0">汽车大数据平台</el-menu-item>
              <div class="flex-grow" />
              <el-menu-item index="1">
                    <router-link to="/Home">整体分析</router-link>
                
             </el-menu-item>
              <el-menu-item  index="2">
              <template #title><router-link to="/about">对比分析</router-link></template>
              </el-menu-item >
              <el-dropdown >
                <span class="el-dropdown-link" >
                    <div >
                        <el-avatar > user </el-avatar>
                      </div>
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item> 
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-menu>
           
           
        </el-header>
        
      </el-container>
    </div>
  </template>

<script>
export default {
    name:'Index',
  methods: {
    
  }
}
</script>


  <style>
    .flex-grow {
  flex-grow: 0;
}
.el-menu-item{
    font-size: larger;
}
 </style>
