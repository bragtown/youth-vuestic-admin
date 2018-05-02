import { HorizontalBar } from 'vue-chartjs'
import DefaultOptions from '../DefaultOptions'

export default HorizontalBar.extend({
  props: ['data', 'options'],
  data () {
    return {
      defaultOptions: {

      }
    }
  },

  mounted () {
    let options = Object.assign({}, DefaultOptions, this.defaultOptions, this.options)
    this.renderBarChart(this.chartData, options)
  },
  methods:{
    renderBarChart:function(){
      this.renderChart(this.chartData,{ responsive: true, maintainAspectRatio: false })
    }
  },
  computed:{
    chartData:function(){
      return this.data
    }
  },
  watch: {
    data: function() {
      console.log('data change')
      let options = Object.assign({}, DefaultOptions, this.defaultOptions, this.options)
      this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderBarChart(this.chartData, options)
    }
  }
  
})
