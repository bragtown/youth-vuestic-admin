<template>
  <div class="dashboard">
    <div class = "row">
      <div class = "col-md-8">
         <youth-list v-bind:youth = "youth"></youth-list>
      </div>
      <div class = "col-md-4">
          
        <youth-attendance v-bind:youth="youth"></youth-attendance>
      </div>
    </div>  
    <div class = "row">
      <div class = "col-md-4">
          <youth-to-do></youth-to-do>
      </div>
      <div class = "col-md-8">
        <youth-chart v-bind:attendanceChartData="attendanceChartData"></youth-chart>
      </div>
    </div>
    
  </div>
</template>

<script>
  import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticSimpleSelect from '../vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
  import YouthList from './components/youth-list'
  import YouthChart from './components/youth-chart'
  import YouthAttendance from './components/youth-attendance'
  import YouthToDo from './components/youth-todo'
  import store from 'vuex-store'
  let palette = store.getters.palette
  let server = store.getters.server
  import axios from 'axios'
  export default {
    name: 'youth',
    components: {
      VuesticWidget,
      VuesticSimpleSelect,
      YouthList,
      YouthChart,
      YouthToDo,
      YouthAttendance
    },
    data:function(){
      return{
        attendance:[],
        attDate:'',
        show:true,
        indY:{},
        attendanceChartData:{
          labels:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets:[
            {
              label:'Sunday Attendance',
              backgroundColor:palette.success,
              borderColor:palette.transparent,
              data:[0,0,0, 0,0,0, 0,0,0, 0,0,0]
            },
            {
              label:'Weekday Attendance',
              backgroundColor:palette.primary,
              borderColor:palette.transparent,
              data:[0,0,0,0,0,0,0,0,0,0,0,0]
            }
          ]
        },
        youth:[],
        newYouth:{},
        server:server
      }
    },
    beforeMount(){
      this.getYouths();
      this.getAttend();
    },
    methods:{
      
      toDatePickerString:function(date){
        let year = date.getFullYear();
        let month = date.getMonth();
        month++;
        let dateVal = date.getDate();
        let monthStr = month > 9 ? month : '0' + month;
        let dateStr = dateVal > 9 ? dateVal : '0' + dateVal
        return `${year}-${monthStr}-${dateStr}`
      },
      toDateString:function(date){
        let dateAr = date.split('-')
        let dateStr = `${dateAr[1]}/${dateAr[2]}/${dateAr[0]}`
        return new Date(dateStr).toLocaleDateString()
      },
      getAttend:function(){
        let vm = this
        console.log(window.location.hostname)
        console.log(vm)

        let params = {quorum:vm.$route.name}
        axios.defaults.withCredentials = true;
        axios.get(server + '/attendance', {params}).then(function(res){
          console.log(res.data)
          res.data.attendance.forEach(function(at){
            if(at.date){
              console.log('test')
              let atDate = new Date(at.date)
              let month = atDate.getMonth()
              let sunday = atDate.getDay()
              sunday = sunday > 0 ? 1 : 0
              let data = vm.attendanceChartData.datasets[sunday].data
              data[month]++
              //this is where drawchart function should be called
            } 
          })
          
          vm.updateChart();
        })
      },
      updateChart:function(){
          let vm = this;
          console.log(vm.$children)
          vm.$children[3].$children[0].$children[0].$children[0].renderBarChart()

      },
      getYouths:function(){
        
        let vm = this;
        console.log('route', vm.$route)
        let params = {quorum:vm.$route.name}
        let config = {withCredentials:true}
        console.log(config)
        axios.defaults.withCredentials = true;
        axios.get(server+'/youths', {params}).then(function(res){
          console.log(res)
          res.data.youths.forEach(youth=>{
           youth.birthdate = vm.toDatePickerString(new Date(youth.birthdate))
           vm.youth.push(youth)
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../node_modules/bootstrap/scss/variables";
  @import "../../../node_modules/bootstrap/scss/mixins/breakpoints";
 .widget.chart-widget {
    .widget-body {
      height: 550px;
    }
  }
  @import "../../sass/_variables.scss";
  
      .btn-micro {
        margin-left: 20px;
      }
</style>
