<template>
    <vuestic-widget headerText = "Current Year Attendance" class="chart-widget">
        <vuestic-chart v-bind:data="attendanceChartData" type="horizontal-bar"></vuestic-chart>

    </vuestic-widget>
</template>
<script>

  import VuesticWidget from '../../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticChart from '../../vuestic-components/vuestic-chart/VuesticChart.vue'
  import store from 'vuex-store'
  let palette = store.getters.palette
  export default {
    name: 'youth-chart',
    components: {
      VuesticWidget,
      VuesticChart
    },
    props:["attendanceChartData"]
  }
</script>
