<template>
    <About/>
    <div id="leida" style="width: 600px; height: 400px"></div>
</template>

<script>
    import About from './About.vue';
    import * as echarts from "echarts";
  import axios from 'axios'
    export default{
      components: { About },
      data(){
        return{
          leida: '',
        ldata:[]
        }
      },
      methods:{
        drawRadar(){
          this.charts = echarts.init(document.getElementById("leida"));
          this.charts.setOption({
            title: {
              text: 'Basic Radar Chart'
            },
            legend: {
              data: ['Allocated Budget', 'Actual Spending']
             },
             radar: {
              // shape: 'circle',
              indicator: [
              { name: 'Sales', max: 6500 },
              { name: 'Administration', max: 16000 },
              { name: 'Information Technology', max: 30000 },
              { name: 'Customer Support', max: 38000 }, 
              { name: 'Development', max: 52000 }, 
              { name: 'Marketing', max: 25000 }
            ]
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [] 
            }
          ]
          })
        },
        initdata(){
          axios.get('http://localhost:8080/labar.json').then(response => {
                    console.log(response.data);
                    this.charts.setOption({
                      series:[{
                        data: response.data
                      }]
                    });
                    return response.data;
                }, response => {
                    console.log("error");
          })
          
        },
          drawCharts() {
            this.drawRadar();
          },
      },
      mounted () {
        	this.initdata();
			this.drawRadar();
        }
    
  }
    </script>