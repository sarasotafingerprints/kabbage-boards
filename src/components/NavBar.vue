<template>
  <v-card>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Kabbage Boards</v-toolbar-title>

        <v-spacer></v-spacer>

        <LoginDialog v-if="!authenticated"/>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        temporary>
        <v-list nav dense>
          <v-list-item v-for="value, key in projects"
            :key="key"
            :to="{ name: 'project', params: { id: value.id } }">
            <v-list-item-title>{{value.name}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="newProjectDialog = true" v-if="authenticated">
            <v-list-item-avatar start>
              <v-icon icon="mdi-folder-plus-outline" class="mr-2"></v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Create Project</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-dialog v-model="newProjectDialog" width="500">
        <NewProjectMenu @saved="newProjectDialog = false"/>
      </v-dialog>
  </v-card>
</template>

<script>
import NewProjectMenu from '@/components/NewProjectMenu.vue';
import LoginDialog from '@/components/LoginDialog.vue';
export default {
  components: { NewProjectMenu, LoginDialog },
  data: () => ({
    drawer: false,
    newProjectDialog: false,
  }),
  computed: {
    projects() {
      return this.$store.getters.sortedProjects;
    },
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    downloadProjectBackup() {
      const fileName = `${this.$store.state.activeProject.name}_Backup_${Date.now()}.json`;
      const exportJSON = JSON.stringify({ data: {
                                                  project: this.$store.state.activeProject,
                                                  boards: this.$store.state.activeBoards,
                                                  buckets: this.$store.state.activeBuckets,
                                                  topics: this.$store.state.activeTopics,
                                                  comments: this.$store.state.activeComments
                                                }
      });
      //courtesy of https://stackoverflow.com/a/30800715/13443483
      var dataStr =
        "data:text/json;charset=utf-8," + encodeURIComponent(exportJSON);
      var downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", fileName);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
  },
};
</script>
