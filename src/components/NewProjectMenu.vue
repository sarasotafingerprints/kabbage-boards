<template>
  <v-card>
    <v-card-title dense>New Project Name</v-card-title>
    <v-form @submit.prevent="submit" v-model="valid" ref="form">
      <v-card-text>
        <v-text-field
          label="Project Name"
          v-model="newProjectName"
          :rules="rules"
        >
        </v-text-field>
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
    newProjectName: "",
    rules: [(v) => !!v || "Required"]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("newProject", this.newProjectName);
        this.$emit("saved");
        this.newProjectName = "";
      }
    }
  },
};
</script>
