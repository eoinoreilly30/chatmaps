<template>
  <v-app>
    <v-main>
      <map-view />
    </v-main>
  </v-app>
</template>

<script>
import MapView from "@/app/MapView";

export default {
  name: "App",
  components: {
    MapView
  },
  data: () => ({
    dialog: false
  })
};
</script>
