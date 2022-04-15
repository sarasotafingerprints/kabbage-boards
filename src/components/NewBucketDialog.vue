<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator>
      <v-btn @click.stop="dialog = true" icon :elevation="0">
        <v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title dense>New Bucket Name</v-card-title>
      <v-form @submit.prevent="submit" v-model="valid" ref="form">
        <v-card-text>
          <v-text-field
            label="Bucket Name"
            v-model="newBucketName"
            :rules="rules"
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
  props: ["board_id"],
  data: () => ({
    dialog: false,
    valid: false,
    rules: [(v) => !!v || "Required"],
    newBucketName: '',
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("newBucket", {name: this.newBucketName, board_id: this.board_id});
        this.dialog = false;
        this.newBucketName = '';
      }
    },
  },
};
</script>
<style>
</style>