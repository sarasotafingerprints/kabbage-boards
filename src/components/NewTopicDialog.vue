<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator>
      <v-btn @click.stop="dialog = true" icon :elevation="0">
        <v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title dense>New Topic</v-card-title>
      <v-form @submit.prevent="submit" v-model="valid" ref="form">
        <v-card-text>
          <v-text-field
            label="Name"
            v-model="newTopicName"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            label="Priority"
            v-model="newTopicPriority"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-combobox
            chips
            deletable-chips
            multiple
            label="Tags"
            :items="previouslyUsedTags"
            v-model="newTopicTags"
          ></v-combobox>
          <v-textarea
            label="Description"
            v-model="newTopicDescription"
          ></v-textarea>
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
  props: ["bucket_id"],
  data: () => ({
    dialog: false,
    valid: false,
    rules: [(v) => !!v || "Required"],
    newTopicName: '',
    newTopicPriority: 3,
    newTopicDescription: '',
    newTopicTags: [],
  }),
  computed: {
    previouslyUsedTags: {
      get() {
        return this.$store.getters.getPreviouslyUsedTags;
      },
      set(value) {
        //We don't actually care to do anything with this value and this log doesn't even log.
        console.log(value);
      },
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("newTopic", {name: this.newTopicName,
                                          bucket_id: this.bucket_id,
                                          priority: this.newTopicPriority,
                                          description: this.newTopicDescription,
                                          tags: this.newTopicTags})
        this.dialog = false;
        this.newTopicName = '';
        this.newTopicPriority = 3;
        this.newTopicDescription = '';
        this.newTopicTags = [];
      }
    },
  },
};
</script>
<style>
</style>