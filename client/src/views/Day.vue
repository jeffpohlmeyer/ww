<template>
  <v-container fluid class="day-container">
    {{ day }}
    <ul>
      <li v-for="period in periods" :key="period._id">
        {{ period }}
      </li>
    </ul>
  </v-container>
</template>

<script>
import PERIODS from "../graphql/Periods.gql";
import DAY from "../graphql/Day.gql";

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
    },
    day: {
      query: DAY,
      variables: {
        dayInput: {
          date: "test"
        }
      }
    }
  },
  created() {
    this.$apollo.queries.day;
  },
  mounted() {
    console.log("this.day", this.day);
  }
};
</script>

<style scoped>
.day-container {
  border: 1px solid black;
}
</style>
