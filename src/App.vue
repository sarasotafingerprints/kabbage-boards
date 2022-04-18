<template>
  <v-app>
      <v-dialog v-model="connected" @click:outside.prevent width="500">
        <LoginDialog />
      </v-dialog>
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
import LoginDialog from "./components/LoginDialog.vue";
export default {
  components: { NavBar, LoginDialog },
  name: "KabbageBoards",
  data: () => ({
    loginDialog: true,
  }),
  computed: {
    connected() {
      return !this.$store.state.connected;
    },
  },
};
</script>
