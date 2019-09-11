import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	modules: {},
  state: {
		token: null,
  },
	getters: {
		getLoggedIn: state => !!state.token,
	},
  mutations: {},
  actions: {},
	strict: debug,
	plugins: [createPersistedState({
		storage: {
			getItem: key => Cookies.get(key),
			setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: true }),
			removeItem: key => Cookies.remove(key)
		}
	})]
});
