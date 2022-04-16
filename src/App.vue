<template>
  <v-app>
      <NavBar />

      <v-main>
        <v-container fluid style="height: 87vh;">
          <router-view :key="$route.fullPath" />
        </v-container>
      </v-main>

      <v-footer padless>
        <v-col
          class="text-right"
          cols="12"
          absolute
        >
          Edit on <a :href="'https://github.com/Ashtacore/kabbage-boards'">GitHub</a>
        </v-col>
      </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  name: "KabbageBoards",
  created() {
    this.$store.dispatch("connectToDirectus").then(() => {
      if(this.$route.params.id > 0) {
        this.$store.dispatch("setActiveProject", this.$route.params.id);
      }
      this.$watch(
        () => this.$route.params.id,
        (newID) => {
          this.$store.dispatch("setActiveProject", newID);
        }
      )
    });
  },
};
</script>
