<template>
    <About/>
    <div id="bar2" style="width: 600px; height: 400px"></div>
</template>

<script>
    import About from './About.vue';
    import * as echarts from "echarts";
    import axios from 'axios'
    export default{
      components: { About },
      data(){
        return{
          charts:"",
          xdata:[],
          ydata:[],
        }
      },
      methods:{
        getData(){
          axios.get('http://localhost:8080/jianbian.json').then(Response=>{
            console.log(Response.data);
            //处理数据
            this.xdata=Response.data[0];
            this.ydata=Response.data[1];
            this.charts = echarts.init(document.getElementById("bar2"));
            this.charts.setOption({
              xAxis: {
                  data: this.xdata,},
                  series: [{
                  data: this.ydata,}]
            })
            //console.log(this.xdata);
            return Response.data;
          }, Response => {
                    console.log("error");
                })
        },
        drawJianBianBar(){
          this.charts = echarts.init(document.getElementById("bar2"));
          let yMax = 500;
          let dataShadow = [];
          for (let i = 0; i < this.ydata.length; i++) {
            dataShadow.push(yMax);
          }
          console.log(this.xdata);
            this.charts.setOption({
              title: {
                 text: '特性示例：渐变色 阴影 ',
                 subtext: 'Feature Sample: Gradient Color, Shadow '
                },
                xAxis: {
                  data: [],
                  axisLabel: {
                    inside: true,
                    color: '#fff'
                  },
                  axisTick: {
                    show: false 
                  },
                  axisLine: {
                    show: false 
                  },
                  z: 10
                },
                yAxis: {
                  axisLine: {
                    show: false 
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: { 
                    color: '#999'
                  }
                },
                
                series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
    }
  ]   
                 
        })
      }
      

      },

      mounted() {
        this.getData();  
        this.drawJianBianBar();       
    },
  }

    </script>