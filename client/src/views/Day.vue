<template>
  <v-container fluid class="day-container">
    {{ day }}
    <ul>
      <li v-for="period in periods" :key="period._id">
        {{ period._id }} -> {{ period.timePeriod }}
      </li>
    </ul>
  </v-container>
</template>

<script>
import PERIODS from "../graphql/Periods.gql";

export default {
  name: "Day",
  data: () => ({
    periods: [{}]
  }),
  computed: {
    day() {
      return this.$route.params.day;
    }
  },
  apollo: {
    periods: {
      query: PERIODS,
      update: data => data.periods
    }
  },
  mounted() {
    this.$apollo.queries.periods;
    console.log("this.periods", this.periods);
  }
};
</script>

<style scoped>
.day-container {
  border: 1px solid black;
}
</style>
