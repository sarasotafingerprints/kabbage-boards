<template>
  <v-card
    v-for="board in activeBoards" :key="board.id"
    class="mb-4"
  >
    <v-card-title>
      {{board.name}}
      <NewBucketDialog :board_id="board.id"/>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col v-for="bucket in bucketsByBoardID[board.id]" :key="bucket.id">
          <v-list>
            <v-list-subheader>
              {{bucket.name}}
              <NewTopicDialog :bucket_id="bucket.id"/>
            </v-list-subheader>
            <draggable
              class="list-group"
              v-model="lists[bucket.id]"
              @change="topicDragged"
              group="bucket" 
              itemKey="id">
              <template #item="{ element, index }">
                <div class="list-group-item">{{ element.name }} {{ index }}</div>
                <!-- <v-list-item two-line class="list-group-item">
                  <v-list-item-header>
                    <v-list-item-title>{{element.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{element.description}}</v-list-item-subtitle>
                  </v-list-item-header>
                </v-list-item> -->
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
import NewBucketDialog from '@/components/NewBucketDialog.vue';
import NewTopicDialog from '@/components/NewTopicDialog.vue';
import { defineComponent } from 'vue';
import draggable from 'vuedraggable';
export default defineComponent({
  name: 'ProjectView',
  components: { NewBoardDialog, NewBucketDialog, NewTopicDialog, draggable },
  data: () => ({
    newBoardDialog: false,
    lists: {
      1: [
        { id: 1, name: 'List 1' },
        { id: 2, name: 'List 2' },
        { id: 3, name: 'List 3' },
      ],
      2: [
        { id: 4, name: 'List 4' },
        { id: 5, name: 'List 5' },
        { id: 6, name: 'List 6' },
      ],
      3: [
        { id: 7, name: 'List 7' },
        { id: 8, name: 'List 8' },
        { id: 9, name: 'List 9' },
      ],
    }
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
        console.log(value)
      },
    },
  },
  methods: {
    topicDragged(e) {
      console.log(e);
    },
  },
});
</script>
