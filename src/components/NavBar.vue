<template>
  <v-card class="mx-auto overflow-hidden" height="400">
    <v-app-bar dense>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
        Kabbage Boards
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="downloadProjectBackup">
        <v-icon>mdi-backup-restore</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item v-for="value, key in projects"
        :key="key" :to="{ name: 'home', params: { id: value.id } }">
          <v-list-item-title>{{value.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    projects() {
      return this.$store.getters.sortedProjects;
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
