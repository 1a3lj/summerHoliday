<template>
    <div>
      <div style="width:  100%; height: 500px" id="map" ></div>
      <el-button @click="add">添加热力图</el-button>
      <el-button @click="clear">清除热力图</el-button>
    </div>
  </template>

  <script>
    import HeatMap from '../assets/js/heatMap.js'
    import axios from 'axios'
    export default {
  name: "HeatMap",
  data() {
    return {
      heatMap: null,
      // 热力图假数据
      heatData: {
        type: "FeatureCollection",
        features:[] 
      },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
// 初始化地图,生成地图服务
    initMap() {
      
      this.heatMap = new HeatMap();
    },
// 添加热力图
    add() {
      axios.get('http://localhost:8080/heatdata.json').then(response=>{
        console.log(response.data);
        this.heatData.features=response.data;
      }, response => {
                    console.log("error");
          })
      this.heatMap.add(this.heatData);
    },
// 清除热力图
    clear() {
      this.heatMap.clear();
    }
  },
};
  </script>

  
  <style >
    .map {
      width: 100%;
      height: 500px;
    }
    </style>