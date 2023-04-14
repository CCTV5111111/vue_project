<template>
  <Breadcrumb />
  <div class="box">
    <div ref="main" style="width: 750px;height: 500px;"></div>
  </div>
</template>



<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import { getReports } from '@/api/add.js'
import { ref, onMounted, reactive } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

var option;

let main = ref(null);

let legend = null
let series = null
let xAxis = null




onMounted(() => {
  var chartDom = main.value;
  var myChart = echarts.init(chartDom);
  getReports().then(res => {
    legend = res.data.legend.data;
    series = res.data.series;
    xAxis = res.data.xAxis[0].data;
    console.log(legend);
  }).then(() => {
    option = {
      title: {
        text: "用户来源",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "rgb(106, 121, 133)",
          },
        },
      },
      legend: {
        data: legend,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: xAxis,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series,
    };
    option && myChart.setOption(option);
  })
})







</script>














<style lang="less" scoped>
.box {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
</style>