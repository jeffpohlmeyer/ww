<template>
  <v-row justify="center">
    <v-col xs="12" sm="8">
      <v-card>
        <v-card-title>User Options</v-card-title>
        <v-card-text>
          <v-form>
            <v-select></v-select>
            <v-text-field
              v-model="birthDate"
              v-mask="birthdateMask"
              hint="mm/dd/yyyy"
              placeholder="Birthdate (mm/dd/yyyy)"
              :prepend-icon="birthdayIcon"
              outlined
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            small
            color="primary"
            class="text-capitalize"
          >
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mdiPartyPopper } from '@mdi/js';
  import { mask } from 'vue-the-mask';

	// todo: create form for user to set main options (weight, height, start-date, tracking methodology, etc)


	export default {
		name: "UserOptions",
    directives: {mask},
    data: () => ({
      day: null,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      birthDate: null,
      height: null,
      sex: null,
      weight: null,
      birthdateMask: '##/##/####'
    }),
    computed: {
			birthdayIcon() { return mdiPartyPopper }
    },
		created() {
			console.log('test')
		}
	}
</script>

<style scoped>

</style>