<template>
    <About/>
    <div id="sortBar" style="width: 600px; height: 400px"></div>
</template>

<script>
    import About from './About.vue';
    import * as echarts from "echarts";
    import axios from 'axios'
    export default{
      components: { About },
      data(){

      },
      methods:{
        getData(){
          axios.get('http://localhost:8080/sortBar.json').then(Response=>{
            console.log(Response.data);
            //处理数据

            this.charts = echarts.init(document.getElementById("sortBar"));
            this.charts.setOption({
              dataset: [{
                dimensions: Response.data.dimension,
                source: Response.data.sourse
              }]
            })
          }, Response => {
                    console.log("error");
                })
        },
        drawSortBar(){
          this.charts = echarts.init(document.getElementById("sortBar"));
            this.charts.setOption({
              dataset: [
    {
      dimensions: [],
      source: [
      ]
    },
    {
      transform: {
        type: 'sort',
        config: { dimension: 'score', order: 'desc' }
      }
    }
  ],
  xAxis: {
    type: 'category',
    axisLabel: { interval: 0, rotate: 30 }
  },
  yAxis: {},
  series: {
    type: 'bar',
    encode: { x: 'name', y: 'score' },
    datasetIndex: 1
  }
            })
        }
      },
      mounted() {
        this.getData();  
        this.drawSortBar();       
    },
  }
    </script>