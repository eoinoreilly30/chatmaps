<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="400px"
    style="z-index: 1000 !important;"
  >
    <v-card rounded>
      <v-card-title class="justify-center">
        Welcome!
      </v-card-title>
      <v-card-text class="justify-center text-center">
        Look for the purple dots to find online users, click on them to call.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="success" @click="getLocation">
          Lets go!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { addJitterToCoord } from "@/plugins/functions";

export default {
  name: "WelcomeDialog",
  data() {
    return {
      dialog: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.dialog = true;
    }, 1000);
  },
  methods: {
    ...mapActions(["popupDialog"]),
    getLocation() {
      this.dialog = false;
      navigator.geolocation.getCurrentPosition(
        position => {
          let lat = addJitterToCoord(position.coords.latitude);
          let long = addJitterToCoord(position.coords.longitude);
          this.$store.commit("position", { lat: lat, long: long });
          this.$store.dispatch("connectPeerServer", [lat, long]);
        },
        () => {
          this.popupDialog({
            title: "Location Permission",
            text: "Please enable location access to use this app"
          });
        }
      );
    }
  }
};
</script>

<style scoped></style>
