/*
 * @Description: 创建缓存，状态管理
 * @Version: 1.0
 * @Autor: wangmiao
 * @Date: 2021-06-23 09:27:04
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-06-23 15:51:41
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
import CreateModules from './modules/createModules.js'
import { localStorage } from 'mp-storage'
	
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		doto: {
			loginInfo:{},
			list:[],
			value: '',
			activeIndex: -1,
			themeStatus:'1'
		},
	},
	getters: {
		loginInfo: state => state.loginInfo,
		doto: state => state.doto,
		
	},
	mutations: {
		LOGIN_INFO(state, val) {
			state.loginInfo = val
		},
		SET_DOTO(state,{ key,value }){
			state.doto[key] = value;
		},
		ADD_DOTO(state,{ key,value }){
			state.doto[key].unshift(value);
		},
		UPDATA_DOTO(state,{ key,id }){
			let index = state.doto[key].findIndex((item) => item.id === id)
			if(index!=-1){
				console.log('我被点击了', state.doto[key][index]);
				if(state.doto[key][index].status==0){
					state.doto[key][index].status = 1
				}else if(state.doto[key][index].status==1){
					state.doto[key][index].status = 0
				}
			}
		},
		DELETE_DOTO(state,{ key,id }){
			let index = state.doto[key].findIndex((item) => item.id === id)
			if(index!=-1){
				state.doto[key].splice(index,1)
			}
		}
	},
	modules: {
		CreateModules
	},
	plugins: [createPersistedState({
		key: "__doto_m_store", // 状态保存到本地的 key  
		//paths: ['token', 'loginInfo'], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c 
		storage: localStorage
	})]
})

export default store
