<template>
  <v-app>
    <v-layout>
      <NavBar />

      <v-main>
        <v-container fluid>
          <router-view :key="$route.fullPath" />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
  name: "KabbageBoards",
  created() {
    this.$store.dispatch("connectToDirectus");
  },
};
</script>
