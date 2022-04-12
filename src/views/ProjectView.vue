<template>
  <v-card
    class="mx-auto"
    width="400"
    v-if="activeProject.id==0"
  >
    <template v-slot:title>
      Please Pick a Project to Get Started
    </template>
  </v-card>

  <BoardS v-else />
</template>

<script>
import { defineComponent } from 'vue';
import BoardS from '@/components/BoardS'
export default defineComponent({
  name: 'ProjectView',
  components: {
    BoardS,
  },
  computed: {
    activeProject() {
      return this.$store.state.activeProject;
    },
  }
});
</script>
