<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>Title</v-card-title>

    <v-card-text>
      This is content
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
  }),
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
}
</script>
