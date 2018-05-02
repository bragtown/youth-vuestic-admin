<template>
<vuestic-widget headerText = "Take Attendance">
          
          <div class="form-group">
            <div class="input-group">
              <input type="date" id="attdate-input" v-model="attDate" required/>
              <label class="control-label" for="attdate-input">Attendance For</label><i class="bar"></i>
            </div>
          </div>
          <div class="abc-checkbox abc-checkbox-primary" v-for="y in youth">
            <input v-bind:id="'cb' + y._id" type="checkbox" :value="y._id" v-model = "attendance">
            <label :for="'cb' + y._id">
              <span class="abc-label-text">{{y.name}}</span>
            </label>
          </div>
          <button class = "btn btn-primary" v-on:click = "takeAttend()">Save</button>
        </vuestic-widget>
</template>
<script>
  import VuesticWidget from '../../vuestic-components/vuestic-widget/VuesticWidget'
  import store from 'vuex-store'
  let server = store.getters.server
  import axios from 'axios'
    export default{
        
        name: 'youth-attendance',
        components: {
            VuesticWidget
        },
        props:["youth"],
        data:function(){
            return{
                attendance:[],
                attDate:'',

            }
        },
        methods:{
            
            takeAttend:function(){
                let vm = this;
                let list = vm.attendance
                let date = new Date(vm.attDate).getTime() + 1000*60*60*24
                axios.defaults.withCredentials = true;
                axios.post(server + '/attendance', {list, date}).then(function(res){
                    let atDate = new Date(vm.attDate)
                    let month = atDate.getMonth()
                    let sunday = atDate.getDay() > 0 ? 1 : 0
                    console.log(vm.$parent.attendanceChartData.datasets[sunday].data[month])
                    vm.$parent.attendanceChartData.datasets[sunday].data[month] += vm.attendance.length
                    console.log(vm.$parent.attendanceChartData.datasets[sunday].data[month])
                    vm.$parent.updateChart();
                    vm.attendance.splice(0,vm.attendance.length)
                })
            },
            toDatePickerString:function(date){
                let year = date.getFullYear();
                let month = date.getMonth();
                month++;
                let dateVal = date.getDate();
                let monthStr = month > 9 ? month : '0' + month;
                let dateStr = dateVal > 9 ? dateVal : '0' + dateVal
                return `${year}-${monthStr}-${dateStr}`
            },
        },
        beforeMount(){
            this.attDate = this.toDatePickerString(new Date)
        }
    }
</script>