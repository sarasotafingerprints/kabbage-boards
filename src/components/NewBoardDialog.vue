<template>
  <v-card>
    <v-card-title dense>New Board Name</v-card-title>
    <v-form @submit.prevent="submit" v-model="valid" ref="form">
      <v-card-text>
        <v-text-field
          label="Board Name"
          v-model="newBoardName"
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
    newBoardName: "",
    rules: [(v) => !!v || "Required"]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("newBoard", this.newBoardName);
        this.$emit("saved");
        this.newBoardName = "";
      }
    }
  },
};
</script>