<template>
    <About/>
    <div id="main" style="width: 600px; height: 400px"></div>
    
    <el-form-item label="选择品牌：">
    <el-select v-model="value" filterable placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @change="currentSel(val2)"
        label-in-value
      />
    </el-select>
    </el-form-item>
    <el-button @click="checkit()">查找</el-button>
</template>

<script>
    import About from './About.vue';
    import * as echarts from "echarts";
    import { ref } from 'vue'

    const value = ref('')
  import axios from 'axios'
    export default{
      components: { About },
      data() {
      return {
        charts: "",
        value:'',
        options:[],
        Val:'',
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
      initSelect(){
        var data1=[];
        axios.get('http://localhost:8080/selectT.json').then(res=>{
          console.log(res.data);
          //var what = res.data;
					//	for (var i=0; i < what.length; i++)
          //  {
          //    data1.push(res.data[i].value);
          //  }
          //数据处理部分
          this.options=res.data;
        },
        res => {
                console.log("error");
        });
       
      },
      checkit(){
        console.log("查找！");
        console.log("查找到"+lab);
      }
    },
    //调用
    mounted() {
        this.getData();    
        this.initSelect();     
    },
    currentSel(val2){
        console.log(val2.modelValue)
      },
  }
    </script>