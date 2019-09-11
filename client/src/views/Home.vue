<template>
  <v-container fluid>
    <v-col>
      <v-card
        outlined
        class="mx-0"
      >
        <v-img
          class="white--text"
          src="../assets/home-card-img.jpg"
          :aspect-ratio="40/10"
        >
          <v-card-title class="align-end fill-height">WW Points Tracking</v-card-title>
        </v-img>
        <v-card-text>
          <p class="my-0">This site is a personal project to track WW points using either the Points Plus system or the Smart Points
            (Freestyle) system.</p>
          <p class="my-0 caption">This site is not intended for personal/monetary gain and is in no way affiliated with WW (formerly known as Weight Watchers).</p>
        </v-card-text>
        <v-card-actions>
          <v-col align="end">
            <v-btn text rounded color="primary" class="text-capitalize" :to="{name: 'Login'}">Log In</v-btn>
            <v-btn text rounded color="primary" class="text-capitalize" :to="{name: 'Register'}">Register</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
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
		}
	};
</script>
