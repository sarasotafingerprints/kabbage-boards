<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator>
      <v-btn @click.stop="dialog = true" color="primary" icon x-small>
        {{comments.length}}
        <v-icon>mdi-comment-processing-outline</v-icon>
      </v-btn>
    </template>

    <v-card >
      <v-card-title >
        {{activeTopic.name}}
      </v-card-title>
      <v-card-subtitle dense>{{activeTopic.description}}</v-card-subtitle>
      
      <v-form @submit.prevent="submit" v-model="valid" ref="form">
        <v-card-text>
          <v-btn color="primary" v-if="!commenting && authenticated" @click="commenting = true">
            <v-icon>mdi-plus</v-icon>
            Add Comment
          </v-btn>
          <v-textarea v-if="commenting"
            v-model="newComment"
            :rules="rules"
            label="Comment"
          ></v-textarea>
          <v-btn type="submit" color="primary" v-if="commenting">Save</v-btn>
          <v-list>
            <v-list-item v-for="comment in comments" :key="comment.id">
              <v-list-item-header>
                <v-list-item-subtitle>{{comment.comment}} @{{comment.date_created}}</v-list-item-subtitle>
              </v-list-item-header>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["activeTopic"],
  data: () => ({
    dialog: false,
    rules: [(v) => !!v || "Required"],
    valid: false,
    commenting: false,
    newComment: '',
  }),
  computed: {
    comments() {
      return this.$store.getters.commentsByTopicID[this.activeTopic.id];
    },
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("newComment", {
          comment: this.newComment,
          topic_id: this.activeTopic.id,
        });
        this.commenting = false;
        this.newComment = '';
      }
    },
  }
};
</script>
<style>
</style>