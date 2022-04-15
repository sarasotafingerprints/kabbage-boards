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
              
            </v-list-subheader>
            <draggable
              class="list-group"
              v-model="topicsByBucketID[bucket.id]"
              group="bucket" 
              itemKey="id">
              <template #item="{element}">
                <!-- <div>{{element.name}}</div> -->
                <v-list-item two-line class="list-group-item">
                  <v-list-item-header>
                    <v-list-item-title>{{element.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{element.description}}</v-list-item-subtitle>
                  </v-list-item-header>
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
import { defineComponent } from 'vue';
import draggable from 'vuedraggable';
export default defineComponent({
  name: 'ProjectView',
  components: { NewBoardDialog, NewBucketDialog, draggable },
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
