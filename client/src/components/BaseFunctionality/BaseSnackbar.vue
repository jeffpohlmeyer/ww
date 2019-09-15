<template>
  <v-snackbar
    v-model="snackbar"
    top
    :color="color"
    :timeout="timeout"
    multi-line
  >
    {{ message }}
    <v-btn
      dark
      text
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapState } from 'vuex';

	export default {
		name: "BaseSnackbar",
    computed: {
			...mapState({
        message: state => state.snackbarMessage,
        color: state => state.snackbarColor,
        timeout: state => state.snackbarTimeout
      }),
      snackbar: {
				get() { return this.$store.state.snackbar },
        set(value) { this.$store.commit('setSnackbar', value) }
      }
    }
	}
</script>

<style scoped>

</style>