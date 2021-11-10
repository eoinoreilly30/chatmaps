<template>
  <v-dialog
    v-model="callDialog"
    max-width="400px"
    persistent
    style="z-index: 1000 !important;"
  >
    <v-card rounded>
      <v-card-title class="justify-center">
        {{ callLoading ? "Calling..." : "Connected" }}
      </v-card-title>
      <v-card-text class="text-center text-body-1">
        <v-btn x-large icon loading v-if="callLoading" />
        <span v-else>You are talking to ...</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="red" v-on="on" v-bind="attrs">
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
import { mapGetters } from "vuex";

export default {
  name: "CallDialog",
  computed: {
    ...mapGetters(["callDialog", "callLoading"])
  }
};
</script>

<style scoped></style>
