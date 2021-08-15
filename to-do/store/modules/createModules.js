/*
 * @Description: 创建缓存，状态管理
 * @Version: 1.0
 * @Autor: wangmiao
 * @Date: 2021-06-23 09:27:04
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-06-23 15:51:41
 */
export default {
	namespaced: true,
	state: () => ({
		vconsole: false,
	}),
	getters: {
		vconsole: state => state.vconsole,
	},
	mutations: {
		UPDATA_VCONSOLE(state, val) {
			state.vconsole = val
		}
	},
	actions: {}
};
