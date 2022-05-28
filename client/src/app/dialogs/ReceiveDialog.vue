<template>
  <v-dialog
    v-model="receiveDialog"
    max-width="400px"
    persistent
    style="z-index: 1000 !important;"
  >
    <v-card rounded>
      <v-card-title class="justify-center">
        {{ receiveLoading ? "Incoming call" : "Connected" }}
      </v-card-title>
      <v-card-text class="text-center text-body-1 py-3">
        <v-btn icon loading v-if="receiveLoading" />
        <span v-else>Say hello!</span>
      </v-card-text>
      <v-card-text class="text-center text-body-1" v-if="receiveLoading">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="mr-6" v-on="on" v-bind="attrs" @click="hangup">
              <v-icon color="red">mdi-phone-hangup</v-icon>
            </v-btn>
          </template>
          <span>Hangup</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs" @click="answerCall">
              <v-icon color="green">mdi-phone</v-icon>
            </v-btn>
          </template>
          <span>Answer</span>
        </v-tooltip>
      </v-card-text>
      <v-card-actions v-if="!receiveLoading">
        <v-spacer />
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="red" v-on="on" v-bind="attrs" @click="hangup">
              <v-icon>mdi-phone-hangup</v-icon>
            </v-btn>
          </template>
          <span>Hangup</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ReceiveDialog",
  computed: {
    ...mapGetters(["receiveDialog", "receiveLoading"])
  },
  methods: {
    ...mapActions(["answerCall", "hangup"])
  }
};
</script>

<style scoped></style>
