<template>
	<div>
		<h2>{{ msg }}</h2>
		<h3>{{ $store.state.count }} -- {{count}}</h3>
		<p>
			<button @click="add">+</button>
			<button @click="reduce">-</button>
		</p>

		<p>
			<button @click="addAction">+</button>
			<button @click="reduceAction">-</button>
		</p>
	</div>
</template>

<script>
	import store from '@/vuex/states.js'
	import {mapState, mapMutations, mapGetters, mapActions  } from 'vuex'
	export default {
		data() {
			return {
				msg: "Hello Vuex"
			}
		},

		methods: {
			...mapMutations(['add','reduce']),
			...mapActions(['addAction','reduceAction'])
		},

		computed: {
			// count(){
			// 	return this.$store.state.count
			// },
			...mapState(['count']),
			// count(){
			// 	return this.$store.getters.count
			// }
			// ...mapGetters(['count'])
		}
		// ---------------------------
		// computed : mapState({
		// 	count: state => state.count
		// })
		// ---------------------------
		// computed: mapState(['count'])

		,
		store
	}	
</script>

<style type="text/css"></style>