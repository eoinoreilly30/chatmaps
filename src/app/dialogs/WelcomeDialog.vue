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
        ChatMaps is the revolutionary state of the art decentralized peer to
        peer chatting app!
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
          this.$store.commit("position", position);
          this.$store.dispatch("connectPeerServer", [
            position.coords.latitude,
            position.coords.longitude
          ]);
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
