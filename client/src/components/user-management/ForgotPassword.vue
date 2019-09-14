<template>
  <v-container>
    <v-row justify="center">
      <v-col
        sm="8"
      >
        <v-card>
            <v-card-title>
              Reset Password
            </v-card-title>
            <v-card-text>

              <v-text-field
                v-if="!submitted"
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                required
              ></v-text-field>

              <p v-if="submitted">
                {{ submittedText }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-container v-if="!submitted">
                <v-row justify="end">
                  <v-btn
                    small
                    rounded
                    :disabled="$v.$invalid"
                    class="text-capitalize"
                    color="success"
                    @click="submit"
                  >
                    Submit
                  </v-btn>

                  <v-btn
                    small
                    rounded
                    class="text-capitalize"
                    color="error"
                    @click="reset"
                  >
                    Reset Form
                  </v-btn>
                </v-row>
              </v-container>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
	import { validationMixin } from 'vuelidate';
	import { required, minLength, maxLength, email} from 'vuelidate/lib/validators';
	import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

	export default {
		name: "ForgotPassword",
		mixins: [validationMixin],
		validations: {
			email: { required, email },
		},
		data: () => ({
			email: '',
      submitted: false,
      foundEmail: true,
		}),
		computed: {
			emailErrors() {
				const errors = [];
				if (!this.$v.email.$dirty) return errors;
				!this.$v.email.required && errors.push('Email is required.');
				!this.$v.email.email && errors.push('A valid email address is required.');
				return errors
			},
      submittedText() {
				return !!this.foundEmail ?
          `An email has been sent to ${this.email} with instructions on how to reset your password.  You may close this page.` :
          `No account with ${this.email} has been found in the system.`
      }
		},
    methods: {
	    submit() {
		    this.$v.$touch();
		    console.log('this.$v.$invalid', this.$v.$invalid)
        this.submitted = true;
	    },
	    reset () {
		    this.$v.$reset();
		    this.email = '';
	    },
    }
	}
</script>

<style scoped>

</style>