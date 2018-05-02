<template>
    <vuestic-widget headerText = "To Do">

          <div class="abc-checkbox abc-checkbox-primary" v-for="(t,index) in todos">
            <input v-bind:id="'cb' + t._id" type="checkbox" :value="t._id" v-model="t.checked" v-on:click="completeToDo(t._id,index)">
            <label :for="'cb' + t._id">
              <span class="abc-label-text">{{t.name}}</span>
            </label>
          </div>      
          <div class="form-group">
            <div class="input-group">
              <input id="simple-input" v-model="task" required/>
              <label class="control-label" for="simple-input">New Task</label><i class="bar"></i>
            </div>
            <button class = "btn btn-success btn-micro" v-on:click="postToDo()">+</button>
          </div>

    </vuestic-widget>
</template>
<script>
    import VuesticWidget from '../../vuestic-components/vuestic-widget/VuesticWidget'
    import store from 'vuex-store'
    let server = store.getters.server
    import axios from 'axios'

    export default{
        name:'youth-todo',
        components:{
            VuesticWidget
        },
        data:function(){
            return {
                task:"",
                todos:[]
            }
        },
        methods:{
            postToDo(){

                let vm = this
                axios.defaults.withCredentials = true;
                axios.post(server + '/todo', {name:vm.task, context:vm.$route.name}).then(function(res){
                    console.log(res.data)
                    // vm.todos.push({name:vm.task, _id:vm.todos.length})
                    vm.todos.push(res.data)
                    vm.task = ""
                })
            },
            completeToDo(_id,index){
                let vm = this;
                axios.defaults.withCredentials = true;
                axios.put(server + '/todo', {_id:_id}).then(function(res){
                vm.todos.splice(index, 1)
                })
            },
            getToDos(){
                let vm = this
                let params = {
                    context: vm.$route.name
                }
                axios.defaults.withCredentials = true;
                axios.get(server + '/todo', {params}).then(function(res){
                    console.log(res.data)
                    res.data.items.forEach((item)=>{
                        vm.todos.push(item)
                    })
                })
            }
        },
        beforeMount(){
            this.getToDos()
        }
    }
</script>
<styles>
@import "../../../sass/_variables.scss";
  
      .btn-micro {
        margin-left: 20px;
      }
</styles>