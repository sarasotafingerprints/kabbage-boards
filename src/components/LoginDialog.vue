<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator>
      <v-btn @click.stop="dialog = true" icon :elevation="0">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title dense>New Topic</v-card-title>
      <v-form @submit.prevent="submit" v-model="valid" ref="form">
        <v-card-text>
          <v-text-field
            label="Username"
            v-model="username"
            :loading="loading"
            :rules="rules"
            ref="username"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :loading="loading"
            type="password"
            :rules="rules"
            ref="password"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    dialog: false,
    rules: [(v) => !!v || "Required"],
    username: '',
    password: '',
    loading: false,
    errorMessages: [],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch("authToDirectus", {directusLogin: this.username, directusPassword: this.password}).then(() => {
          if(this.$route.params.id > 0) {
            this.$store.dispatch("setActiveProject", this.$route.params.id)
          }
          this.dialog = false;
        }).catch((error) => {
          this.$refs.username.errorMessages.push(error)
          this.$refs.password.errorMessages.push(error)
        }).finally(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style>
</style>