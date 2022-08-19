<template>
    <Home/>
    <div id="main" style="width: 600px; height: 400px"></div>
</template>

<script>
    import Home from './Home.vue';
    import * as echarts from "echarts";
  import axios from 'axios'
    export default{
      components:{
        Home
      },
      data() {
      return {
        charts: "",
        /*
        opinionData: ["3", "2", "4", "4", "5"],*/
        opinionData: [],
        Date:[],
      };
    },
    methods: {
        getData() {
          var IData = [];
          var Date=[];
                axios.get('http://localhost:8080/zx.json').then(response => {
                    console.log(response.data);
                       //this.opinionData =response.data.data;
                       var price = response.data;
						for (var i=0; i < price.length; i++){
              Date.push(response.data[i].date)
              IData.push(response.data[i].caseincrease);
            }

            this.charts = echarts.init(document.getElementById("main"));
        this.charts.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["caseincrease"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
   
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: Date,
          },
          yAxis: {
            type: "value",
          },
   
          series: [
            {
              name: "caseincrease",
              type: "line",
              stack: "总量",
              data: IData,
            },
          ],
        });
                }, response => {
                    console.log("error");
                });
            },


      drawLine(id) {
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["caseincrease"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
   
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["1", "2", "3", "4", "5"],
          },
          yAxis: {
            type: "value",
          },
   
          series: [
            {
              name: "caseincrease",
              type: "line",
              stack: "总量",
              data: this.opinionData,
            },
          ],
        });
      },
    },
    //调用
    mounted() {
        this.getData();         
    },
  }
    </script>