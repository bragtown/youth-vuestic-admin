<template>
<div>
<vuestic-widget headerText = "Youth">
        
          <table class="table table-striped table-sm color-icon-label-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Quorum</th>
                <th>Birthday</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="y in youth">
                <td>{{y.name}}</td>
                <td><a :href = "'tel:+'+y.phone">{{y.phone}}</a></td>
                <td>{{y.quorum}}</td>
                <td>{{toDateString(y.birthdate)}}</td>
                <td>
                  <button class="btn btn-primary btn-micro btn-with-icon rounded-icon" @click="showLargeModal(y)">
                    <span class = "glyphicon glyphicon-pencil"></span>
                  </button>
                  <button class="btn btn-warning btn-micro btn-with-icon rounded-icon" v-on:click="deactivate(y._id)">
                    <span class = "glyphicon glyphicon-minus"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </vuestic-widget> 
        <modal :show.sync="show" v-bind:large="true" ref="largeModal">
      <div slot="title">Large Modal</div>
      <div>
          <div class="form-group">
            <div class="input-group">
              <input id="simple-input" v-model="indY.name" required/>
              <label class="control-label" for="simple-input">Name</label><i class="bar"></i>
            </div>
          </div>
    
            
          <vuestic-simple-select
            label="Class"
            v-model="indY.quorum"
            v-bind:options="['Deacons', 'Teachers', 'Priests', 'Beehives', 'Mia Maids', 'Laurels']">
          </vuestic-simple-select>
          
          <div class="form-group">
            <div class="input-group">
              <input id="simple-input"  v-model="indY.phone" required/>
              <label class="control-label" for="simple-input">Phone Number</label><i class="bar"></i>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input type="date" id="simple-input" v-model="indY.birthdate" required/>
              <label class="control-label" for="simple-input">Birthday</label><i class="bar"></i>
            </div>
          </div>
      </div>
      <div slot = "footer">
          <button class = "btn btn-primary" v-on:click="updateYouth()">Save</button>
          <button class = "btn btn-warning" v-on:click="$refs.largeModal.cancel()">Cancel</button>
          <button class = "btn btn-danger" v-on:click="remove(indY._id)">Delete Record</button>
      </div>
    </modal>
        </div>
</template>
<script>
  import VuesticWidget from '../../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticSimpleSelect from '../../vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
  import Modal from '../../vuestic-components/vuestic-modal/VuesticModal'
  import store from 'vuex-store'
  let server = store.getters.server
  import axios from 'axios'
  export default {
      name:'youth-list',
      props:["youth"],
      components: {
        VuesticWidget,
        VuesticSimpleSelect,
        Modal

      },
      data:function(){
        return{
            show:true,
            indY:{}
        }
      },
      
      methods:{
        deactivate:function(_id){
            let vm = this;
            axios.defaults.withCredentials = true;
            axios({
            method:'put',
            baseURL:server,
            url:'/deactivate',
            data:{_id}
            }).then(function(res){
            console.log(res)
            for(let i = 0; i < vm.youth.length; i++){
                if(vm.youth[i]._id == _id) vm.youth.splice(i,1)
            }
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
        toDateString:function(date){
            let dateAr = date.split('-')
            let dateStr = `${dateAr[1]}/${dateAr[2]}/${dateAr[0]}`
            return new Date(dateStr).toLocaleDateString()
        },
        showLargeModal (y) {
            this.indY = y
            console.log(this)
            this.$refs.largeModal.open()
        },
        updateYouth:function(){
            let vm = this;
            console.log(vm.indY.birthdate, new Date(vm.indY.birthdate))
            vm.indY.birthdate = new Date(vm.indY.birthdate).getTime() + 1000*60*60*24;
            console.log(vm.indY.birthdate)
            axios.defaults.withCredentials = true;
            axios({
            method:'put',
            baseURL:server,
            url:'/youth',
            data:vm.indY
            }).then(function(res){
            console.log(res)
            vm.indY.birthdate = vm.toDatePickerString(new Date(vm.indY.birthdate))
            vm.$refs.largeModal.cancel();
            })

        },
        remove:function(_id){
            let vm = this;
        axios.defaults.withCredentials = true;
            axios({
            method:'delete',
            baseURL:server,
            url:'/youth',
            data:{_id}
            }).then(function(res){
            vm.$refs.largeModal.cancel()
            vm.youth.forEach(function(item,index, arr){
                if(_id == item._id){
                arr.splice(index,1)
                } 
            })

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
  @import "../../../sass/_variables.scss";
  
      .btn-micro {
        margin-left: 20px;
      }
</style>

