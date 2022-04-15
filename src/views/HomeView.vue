<template>
  <v-card
    class="mx-auto"
    width="400"
  >
    <v-card-title>Please Pick a Project to Get Started</v-card-title>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeView',
  computed: {
    activeProject() {
      return this.$store.state.activeProject;
    },
  }
});
</script>
