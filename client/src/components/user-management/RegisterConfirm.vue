<template>
  <div></div>
</template>

<script>
	import REGISTER_CONFIRM from "../../graphql/User/RegisterConfirm.gql";

	export default {
		name: "RegisterConfirm",
    data: () => ({}),
    async created() {
			try {
				const response = await this.$apollo.mutate({
					mutation: REGISTER_CONFIRM,
					variables: {
						token: this.$route.params.token
					}
				});
				const { validateEmail } = response.data;
				this.$store.commit('setToken', validateEmail.token);
				this.$router.push({name: 'UserOptions'});
      } catch(err) {
				if (!!err.graphQLErrors) {
					const message = err.graphQLErrors.map(e => e.message).join(' ');
					const color = 'error';
					const snackbar = true;
					this.$store.commit('setSnackbarData', {message, color, snackbar})
				}
				console.log(
					`[user-management/RegisterConfirm/created] An error occurred ${err}`
				);
      }
    }
	}
</script>

<style scoped>

</style>