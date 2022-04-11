<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'Kabbage Boards',

  data: () => ({
    //
  }),
}
</script>
