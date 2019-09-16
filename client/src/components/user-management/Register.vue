<template>
  <v-container>
    <div
      v-if="!submitted"
    >
      <v-row
        justify="center"
      >
        <v-col
          sm="8"
        >
          <v-card>
            <v-card-title>
              Register
            </v-card-title>
            <v-card-text>

              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                :append-icon="passwordVisibility"
                :type="showPassword ? 'text' : 'password'"
                hint="Between 10 and 32 characters"
                counter
                label="Password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-text-field
                v-model="repeatPassword"
                :error-messages="repeatPasswordErrors"
                :append-icon="repeatPasswordVisibility"
                :type="showRepeat ? 'text' : 'password'"
                hint="Between 10 and 32 characters"
                counter
                label="Password (Confirm)"
                @input="$v.repeatPassword.$touch()"
                @blur="$v.repeatPassword.$touch()"
                required
                @click:append="showRepeat = !showRepeat"
              ></v-text-field>

            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row justify="end">
                  <v-btn
                    small
                    rounded
                    :loading="loading"
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
      <v-row justify="center">
        Already have an account?  Click<router-link :to="{name: 'Login'}" class="mx-1"> here </router-link>to log in.
      </v-row>
    </div>
    <div v-if="submitted">
      <v-row justify="center">
        Please check your email for a confirmation link.  If you don't receive it soon please check your spam filter.  You can close this page.
      </v-row>
    </div>
  </v-container>
</template>

<script>
	import { validationMixin } from 'vuelidate';
	import { required, minLength, maxLength, sameAs, email} from 'vuelidate/lib/validators';
	import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

	import REGISTER from "../../graphql/User/Register.gql";

	export default {
		name: "Register",
		mixins: [validationMixin],
		validations: {
			email: { required, email },
			password: { required, minLength: minLength(10), maxLength: maxLength(10) },
			repeatPassword: { sameAsPassword: sameAs('password') }
		},
		data: () => ({
			email: '',
			password: '',
			showPassword: false,
			repeatPassword: '',
			showRepeat: false,
			loading: false,
			submitted: false,
		}),
		computed: {
			emailErrors() {
				const errors = [];
				if (!this.$v.email.$dirty) return errors;
				!this.$v.email.required && errors.push('Email is required.');
				!this.$v.email.email && errors.push('A valid email address is required.');
				return errors
			},
			passwordErrors() {
				const errors = [];
				if (!this.$v.password.$dirty) return errors;
				!this.$v.password.required && errors.push('A password is required.');
				!this.$v.password.minLength && errors.push('Passwords must be at least 10 characters.');
				!this.$v.password.maxLength && errors.push('Passwords cannot be any longer than 32 characters.');
				return errors
			},
			repeatPasswordErrors() {
				const errors = [];
				if (!this.$v.repeatPassword.$dirty) return errors;
				!this.$v.repeatPassword.sameAsPassword && errors.push('Passwords must match.');
				return errors
			},
			passwordVisibility() { return !this.showPassword ? mdiEyeOutline : mdiEyeOffOutline },
			repeatPasswordVisibility() { return !this.showRepeat ? mdiEyeOutline : mdiEyeOffOutline },
			valid() { return !this.$v.$invalid }
		},
		methods: {
			async submit() {
				this.loading = true;
				try {
					this.$v.$touch();
					await this.$apollo.mutate({
						mutation: REGISTER,
						variables: {
							userInput: {
								email: this.email,
								password: this.password
							}
						}
					});
					this.loading = false;
					this.submitted = true;
				} catch(err) {
					this.loading = false;
					if (!!err.graphQLErrors) {
						const message = err.graphQLErrors.map(e => e.message).join(' ');
						const color = 'error';
						const snackbar = true;
						this.$store.commit('setSnackbarData', {message, color, snackbar})
					}
					console.log(
						`[user-management/Register/submit] An error occurred ${err}`
					);
				}
			},
			reset () {
				this.$v.$reset();
				this.email = '';
				this.password = '';
				this.repeatPassword = '';
			},
		}
	}
</script>

<style scoped>

</style>