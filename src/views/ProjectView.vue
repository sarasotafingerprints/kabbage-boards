<template>
  <v-card
    v-for="board in activeBoards" :key="board.id"
    class="mb-4"
  >
    <v-card-title>
      {{board.name}}
      <NewBucketDialog :board_id="board.id" v-if="authenticated"/>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col v-for="bucket in bucketsByBoardID[board.id]" :key="bucket.id">
          <v-list>
            <v-list-subheader>
              {{bucket.name}}
              <NewTopicDialog :bucket_id="bucket.id" v-if="authenticated"/>
            </v-list-subheader>
            <draggable
              class="list-group"
              v-model="topicsByBucketID[bucket.id]"
              @change="movedTopic(bucket.id, $event)"
              group="bucket" 
              itemKey="id">
              <template #item="{ element }">
                <v-list-item two-line class="list-group-item" :color="priorityColors[element.priority]">
                  <v-list-item-header>
                    <v-list-item-title>{{element.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{element.description}}</v-list-item-subtitle>
                  </v-list-item-header>
                  <v-list-item-avatar end>
                    <CommentsMenu :activeTopic="element"/>
                  </v-list-item-avatar>
                </v-list-item>
              </template>
            </draggable>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-btn
    class="mt-2"
    color="primary"
    @click.stop="newBoardDialog = true"
    v-if="authenticated"
  >
    <v-icon left>mdi-plus-box-outline</v-icon>
    Add Board
  </v-btn>

  <v-dialog v-model="newBoardDialog" width="500">
    <NewBoardDialog @saved="newBoardDialog = false"/>
  </v-dialog>
</template>

<script>
import NewBoardDialog from '@/components/NewBoardDialog.vue';
import NewBucketDialog from '@/components/NewBucketDialog.vue';
import NewTopicDialog from '@/components/NewTopicDialog.vue';
import CommentsMenu from '@/components/CommentsMenu.vue';
import { defineComponent } from 'vue';
import draggable from 'vuedraggable';
export default defineComponent({
  name: 'ProjectView',
  components: { NewBoardDialog, NewBucketDialog, NewTopicDialog, CommentsMenu, draggable },
  data: () => ({
    newBoardDialog: false,
    priorityColors: {
      1: 'primary',
      2: 'info',
      3: undefined,
      4: 'orange',
      5: 'red',
    },
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
    topicsByBucketID: {
      get() {
        return this.$store.getters.topicsByBucketID;
      },
      set(value) {
        // This prevents any direct modification
        console.log(value)
      },
    },
    commentsByTopicID() {
      return this.$store.getters.commentsByTopicID;
    },
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    movedTopic(bucket_id, event) {
      if('added' in event) {
        const newTopic = {
          id: event.added.element.id,
          name: event.added.element.name,
          bucket_id: bucket_id,
          priority: event.added.element.priority,
          description: event.added.element.description,
          tags: event.added.element.tags,
        }
        const oldTopic = {
          id: event.added.element.id,
          name: event.added.element.name,
          bucket_id: event.added.element.bucket_id,
          priority: event.added.element.priority,
          description: event.added.element.description,
          tags: event.added.element.tags,
        }
        this.$store.dispatch('moveTopic', {
          newTopic: newTopic,
          oldTopic: oldTopic,
        });
      }
      // I don't need to handle a delete event because the store's upsert will handle it
      // I don't care about the 'moved' event because I will always sort by name
    }
  },
});
</script>
