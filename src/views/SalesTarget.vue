<template>
    <Home/>
    <div class="chart-container">
      target
      <div id="chartPie" style="width:100%; height:550px;"></div>
    </div>
</template>

<script>
    import Home from './Home.vue';
    import * as echarts from "echarts";
    import axios from 'axios'
    import { ElMessage } from 'element-plus'
    export default{
      components: { Home },
      data() {
        	return {
        		chartPie: '',
				typeName: [],//名字
				typeNum: [] //数字
			}
		},
    methods:{
      drawPieChart() {
				this.charts = echarts.init(document.getElementById("chartPie"));
				this.charts.setOption({
					//设置标题,副标题,以及标题位置居中
					title: {
						text: '统计(饼状图)',
						//subtext: '纯属虚构',
						x: 'center'
					},
					//具体点击某一项触发的样式内容
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					//左上侧分类条形符
					legend: {
						orient: 'vertical',
						left: 'left',
						data: []
					},
					//饼状图类型以及数据源
					series: [
						{
							name: '统计数量',
							type: 'pie',
							//radius: '70%',
							//center: ['50%', '60%'],
							data: [],
							//设置饼状图扇形区域的样式
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},
						}
					]
				});
			},
      initData() {
                axios.get('http://localhost:8080/bin.json').then(response => {
                    console.log(response.data); 
                    this.charts.setOption({
                   
					series:[{
							data: response.data
						}]
				});
                return response.data;
                }, response => {
                    console.log("error");
                });
            },
            drawCharts() {
				this.drawPieChart();
			},
    },
    mounted () {
        	this.initData();
			this.drawCharts();
        }
    }
    </script>

<style>
	.chart-container {
		width: 100%;
		float: left;
	}
</style>