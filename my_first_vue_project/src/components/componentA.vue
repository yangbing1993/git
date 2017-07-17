<template>
	<div class="hello">
		<h1>{{msg}}</h1>
		<h1>{{tellmyson}}</h1>
		<button v-on:click="onClick">点我</button>
	</div>
</template>
<script>
export default{
	data:function(){
		return {
			msg:'Hello,World!'
		}
	},
	props:['tellmyson'],
	methods:{
		onClick:function(){
			//console.log(this.tellmyson)
			this.$emit('son-tell-me',this.msg);
		}
	}

}
</script>
<style>
h1{
  color:#42b983;
}
</style>