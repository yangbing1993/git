<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input v-model="newItem" v-on:keyup.enter="addNew()">	<button v-on:click="deleteItem()">删除</button>
    <ul>
    	<li v-for="item in items" v-bind:class="{finished:item.isFished}" v-on:click="toggleFinished(item)">
    		{{item.label}}
    	</li>
    </ul>
    <p> my son tell me:{{mySonSay}}</p>
    <component-a tellmyson="grow up quickly!" v-on:son-tell-me="listenMySon"></component-a>
  </div>
</template>
<script>
import Store from './store.js';
import componentA from './components/componentA.vue';
export default {
  data:function(){
  	return {
  		title:"My first tudo list",
  		items:Store.fetch(),
  		newItem:'',
      mySonSay:''
  	}
  },
  components:{
    componentA
  },
  watch:{
    items:{
      handler:function(items){
        Store.save(items);
      },
      deep:true
    }
  },
  methods:{
  	toggleFinished:function(item){
  		item.isFished = !item.isFished;
  	},
  	addNew:function(){
  		this.items.push({
  			label:this.newItem,
  			isFished:false
  		})
  		this.newItem = ''
  	},
  	deleteItem:function(){
  		this.items.pop()
  	},
    listenMySon:function(msg){
      this.mySonSay=msg
    }
  }
}
</script>

<style>
.finished{
	text-decoration: underline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li:hover{
	cursor: pointer;
}
</style>
