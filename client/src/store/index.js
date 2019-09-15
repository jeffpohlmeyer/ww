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
	  snackbar: false,
	  snackbarMessage: '',
	  snackbarColor: '',
	  snackbarTimeout: 6000,
  },
	getters: {
		getLoggedIn: state => !!state.token,
	},
  mutations: {
		setSnackbar(state, payload) {
			state.snackbar = payload;
		},
	  setSnackbarData(state, payload) {
			state.snackbar = payload.snackbar;
			state.snackbarMessage = payload.message;
			state.snackbarColor = payload.color;
			state.snackbarTimeout = !!payload.snackbarTimeout ? payload.snackbarTimeout : 6000;
	  }
  },
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
