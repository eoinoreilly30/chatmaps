<template>
  <div>
    <welcome-dialog />
    <call-dialog />
    <receive-dialog />
    <map-view />
    <v-toolbar
      v-if="myId"
      style="position: absolute; top: 0; right: 0; z-index: 1000"
      height="40px"
    >
      <div style="display: flex; align-items: center">
        <v-icon small class="mr-2" :color="peers.length > 0 ? 'green' : 'grey'">
          mdi-checkbox-blank-circle
        </v-icon>
        {{ peers.length }}
        {{ peers.length === 1 ? "user" : "users" }} online
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import MapView from "@/app/views/MapView";
import WelcomeDialog from "@/app/dialogs/WelcomeDialog";
import CallDialog from "@/app/dialogs/CallDialog";
import ReceiveDialog from "@/app/dialogs/ReceiveDialog";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: { ReceiveDialog, CallDialog, WelcomeDialog, MapView },
  computed: {
    ...mapGetters(["myId", "peers"])
  }
};
</script>

<style scoped></style>
