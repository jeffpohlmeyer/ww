<template>
  <div></div>
</template>

<script>
  import { mapState } from 'vuex';

export default {
	computed: {
		...mapState({
      token: state => state.token,
    })
  },
  created() {
		if (!this.token) {
			//redirect to login
			console.log('no token')
    } else {
			//redirect to home page
    }
  }
};
</script>
