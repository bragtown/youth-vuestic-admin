<template>
  <div class="dashboard">
    <div class = "row">
      <div class = "col-md-12">
        <vuestic-widget headerText = "New Youth">
          
          <div class="form-group">
            <div class="input-group">
              <input id="simple-input" v-model="newYouth.name" required/>
              <label class="control-label" for="simple-input">Name</label><i class="bar"></i>
            </div>
          </div>
    
            
          <vuestic-simple-select
            label="Class"
            v-model="newYouth.quorum"
            v-bind:options="['Deacons', 'Teachers', 'Priests', 'Beehives', 'Mia Maids', 'Laurels']">
          </vuestic-simple-select>
          
          <div class="form-group">
            <div class="input-group">
              <input id="simple-input"  v-model="newYouth.phone" required/>
              <label class="control-label" for="simple-input">Phone Number</label><i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input type="date" id="simple-input" v-model="newYouth.birthdate" required/>
              <label class="control-label" for="simple-input">Birthday</label><i class="bar"></i>
            </div>
          </div>
          <button class = "btn btn-primary" v-on:click="saveYouth()">Save</button>

        </vuestic-widget>
      </div>
    </div>
    
  </div>
</template>

<script>
  import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticSimpleSelect from '../vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
  import store from 'vuex-store'
  import axios from 'axios'
  let server = store.getters.server
  export default {
    name: 'dashboard',
    components: {
      VuesticWidget,
      VuesticSimpleSelect
    },
    data:function(){
      return{
        newYouth:{},
        server:server
      }
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
      
      saveYouth:function(){
        let vm = this;
        vm.newYouth.birthdate = new Date(vm.newYouth.birthdate).getTime()+ 1000*60*60*24;
        axios.defaults.withCredentials = true;
        axios({
          method:'post',
          baseURL:vm.server,
          url:'/youth',
          data:vm.newYouth
        }).then(function(res){
          res.data.youth.birthdate = vm.toDatePickerString(new Date(res.data.youth.birthdate));
          vm.newYouth.name = ""
          vm.newYouth.quorum = ""
          vm.newYouth.birthdate = ''
          vm.newYouth.phone = ""
        })
      }
    }
  }
</script>

<style lang="scss">
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
