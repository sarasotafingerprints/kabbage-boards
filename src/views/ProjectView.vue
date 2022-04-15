<template>
  <v-card
    v-for="board in activeBoards" :key="board.id"
    class="mb-4"
  >
    <v-card-title>{{board.name}}</v-card-title>

    <v-card-text>
      <v-list v-for="bucket in bucketsByBoardID[board.id]" :key="bucket.id">
        <v-list-subheader>{{bucket.name}}</v-list-subheader>
        <draggable v-model="topicsByBucketID[bucket.id]" :options="{group:'topic'}" style="min-height: 10px">
          <template v-for="topic in topicsByBucketID[bucket.id]" :key="topic.id">
            <v-list-item two-line>
              <v-list-item-header>
                <v-list-item-title>{{topic.name}}</v-list-item-title>
                <v-list-item-subtitle>{{topic.description}}</v-list-item-subtitle>
              </v-list-item-header>
            </v-list-item>
          </template>
        </draggable>
      </v-list>
    </v-card-text>
  </v-card>

  <v-btn
    class="mt-2"
    color="primary"
    @click.stop="newBoardDialog = true"
  >
    <v-icon left>mdi-plus-box-outline</v-icon>
    Add Board
  </v-btn>

  <v-dialog v-model="newBoardDialog" width="500">
    <NewBoardDialog @saved="newBoardDialog = false" />
  </v-dialog>
</template>

<script>
import NewBoardDialog from '@/components/NewBoardDialog.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ProjectView',
  components: { NewBoardDialog },
  data: () => ({
    newBoardDialog: false,
  }),
  computed: {
    activeProject() {
      return this.$store.state.activeProject;
    },
    activeBoards() {
      return this.$store.state.activeBoards;
    },
    bucketsByBoardID() {
      return this.$store.getters.bucketsByBoardID;
    },
    topicsByBucketID() {
      return this.$store.getters.topicsByBucketID;
    },
  }
});
</script>
