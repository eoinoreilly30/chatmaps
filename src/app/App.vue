<template>
  <v-app>
    <router-view />
    <popup-dialog />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import PopupDialog from "@/app/dialogs/PopupDialog";

export default {
  name: "App",
  components: { PopupDialog },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    ...mapActions(["destroy"])
  }
};
</script>

<style>
* {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}

*::-webkit-scrollbar {
  display: none;
}
</style>
