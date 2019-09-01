<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="headline text-uppercase">WW</span>
        <span class="font-weight-light text-capitalize subtitle-1"
          >Points Plus Tracking
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">*</span>
            </template>
            <span>
              This site is in no way affiliated with WW (Weight Watchers). This
              is purely for personal use.
            </span>
          </v-tooltip>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
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
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: true
  })
};
</script>
