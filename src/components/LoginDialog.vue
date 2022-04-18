<template>

  <v-card>
    <v-card-title dense>New Topic</v-card-title>
    <v-form @submit.prevent="submit" v-model="valid" ref="form">
      <v-card-text>
        <v-text-field
          label="Directus Endpoint"
          v-model="directusEndpoint"
          :loading="loading"
          :rules="rules"
        ></v-text-field>
        <v-text-field
          label="Username"
          v-model="username"
          :loading="loading"
          :rules="rules"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          :loading="loading"
          type="password"
          :rules="rules"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    rules: [(v) => !!v || "Required"],
    directusEndpoint: 'http://localhost:8055',
    username: '',
    password: '',
    loading: false,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch("connectToDirectus", {directusEndpoint: this.directusEndpoint, directusLogin: this.username, directusPassword: this.password}).then(() => {
          if(this.$route.params.id > 0) {
            this.$store.dispatch("setActiveProject", this.$route.params.id)
          }
          this.$watch(
            () => this.$route.params.id,
            (newID) => {
              this.$store.dispatch("setActiveProject", newID);
            }
          );
        }).catch((error) => {
          console.log(error);
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