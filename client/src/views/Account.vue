<template>
  <div>{{token}}</div>
</template>

<script>
  import { mapState } from 'vuex';

export default {
  name: "Account",
  computed: {
  	...mapState({
      token: state => state.token
    })
  }
};
</script>

<style scoped></style>
