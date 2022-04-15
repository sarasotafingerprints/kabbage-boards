<template>
  <v-card
    v-for="value in activeBoards" :key="value.id"
    class="mb-4"
  >
    <v-card-title>{{value.name}}</v-card-title>

    <v-card-text>
      This is content
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ProjectView',
  computed: {
    activeProject() {
      return this.$store.state.activeProject;
    },
    activeBoards() {
      return this.$store.state.activeBoards;
    },
    activeBuckets() {
      return this.$store.state.activeBuckets;
    },
  }
});
</script>
