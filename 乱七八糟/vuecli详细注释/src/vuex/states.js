import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let state = {
	count : 3
}

const getters = {
	count : function(state){
		return state.count += 10;
	}
}

const mutations = {
	add(state){
		state.count ++;
	},
	reduce(state){
		state.count --;
	}
}

const actions = {
	addAction(context){
		context.commit('add')
	},
	reduceAction(context){
		context.commit('reduce')
	}
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})