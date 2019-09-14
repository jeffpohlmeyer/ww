<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon @click="goHome" class="mx-2">{{ homeIcon }}</v-icon>
      <v-toolbar-title>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <span class="headline text-uppercase">WW</span>
              <span class="font-weight-light text-capitalize subtitle-1">
                Points* Tracking
              </span>
            </span>
          </template>
          <span>
            This site is in no way affiliated with WW (Weight Watchers). This is
            purely for personal use.
          </span>
        </v-tooltip>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        fab
        depressed
        small
        v-if="loggedIn"
      >
        <v-icon>{{ userIcon }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer">
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { mdiAccountOutline, mdiHomeOutline } from "@mdi/js";

	export default {
		name: "App",
		components: {},
		data: () => ({
			drawer: true,
			userIcon: mdiAccountOutline,
      homeIcon: mdiHomeOutline,
		}),
		computed: {
			...mapGetters({
				loggedIn: 'getLoggedIn',
			})
		},
    methods: {
			goHome() {
				this.$router.push({name: 'Home'});
      }
    }
	};
</script>
