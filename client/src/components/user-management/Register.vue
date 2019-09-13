<template>
  <v-container>
    <v-row justify="center">
      <v-col
        sm="8"
      >
        <v-card>
          <form>
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
                v-model="passwordOne"
                :error-messages="passwordOneErrors"
                :append-icon="passwordOneVisibility"
                :type="showOne ? 'text' : 'password'"
                hint="Between 10 and 32 characters"
                counter
                label="Password"
                @input="$v.passwordOne.$touch()"
                @blur="$v.passwordOne.$touch()"
                required
                @click:append="showOne = !showOne"
              ></v-text-field>

              <v-text-field
                v-model="passwordTwo"
                :error-messages="passwordTwoErrors"
                :append-icon="passwordTwoVisibility"
                :type="showTwo ? 'text' : 'password'"
                hint="Between 10 and 32 characters"
                counter
                label="Password (Confirm)"
                @input="$v.passwordTwo.$touch()"
                @blur="$v.passwordTwo.$touch()"
                required
                @click:append="showTwo = !showTwo"
              ></v-text-field>

            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row justify="end">
                  <v-btn
                    small
                    rounded
                    :disabled="!valid"
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
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, minLength, maxLength, sameAs, email} from 'vuelidate/lib/validators';
	import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

	export default {
		name: "Register",
    mixins: [validationMixin],
    validations: {
			email: { required, email },
      passwordOne: { required, minLength: minLength(10), maxLength: maxLength(10) },
      passwordTwo: { sameAsPassword: sameAs('passwordOne') }
    },
    data: () => ({
      email: '',
      passwordOne: '',
      showOne: false,
      passwordTwo: '',
      showTwo: false,
    }),
    computed: {
			emailErrors() {
				const errors = [];
				if (!this.$v.email.$dirty) return errors;
				!this.$v.email.required && errors.push('Email is required.');
				!this.$v.email.email && errors.push('A valid email address is required.');
        return errors
      },
      passwordOneErrors() {
				const errors = [];
				if (!this.$v.passwordOne.$dirty) return errors;
        !this.$v.passwordOne.required && errors.push('A password is required.');
        !this.$v.passwordOne.minLength && errors.push('Passwords must be at least 10 characters.');
        !this.$v.passwordOne.maxLength && errors.push('Passwords cannot be any longer than 32 characters.');
        return errors
      },
      passwordTwoErrors() {
				const errors = [];
				if (!this.$v.passwordTwo.$dirty) return errors;
				!this.$v.passwordTwo.sameAsPassword && errors.push('Passwords must match.');
				return errors
      },
	    passwordOneVisibility() { return !this.showOne ? mdiEyeOutline : mdiEyeOffOutline },
	    passwordTwoVisibility() { return !this.showTwo ? mdiEyeOutline : mdiEyeOffOutline },
      valid() { return !this.$v.$invalid }
    },
    methods: {
	    submit() {
		    this.$v.$touch()
        console.log('this.$v.$invalid', this.$v.$invalid)
	    },
	    reset () {
	    	this.$v.$reset();
	    	this.email = '';
	    	this.passwordOne = '';
	    	this.passwordTwo = '';
	    },
    }
	}
</script>

<style scoped>

</style>