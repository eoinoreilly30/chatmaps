<template>
  <v-dialog
    v-model="status"
    max-width="400px"
    style="z-index: 1000 !important;"
  >
    <v-card>
      <v-card-title>
        {{ popupDialog.title }}
      </v-card-title>
      <v-card-text>
        {{ popupDialog.text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="success" @click="status = false">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PopupDialog",
  computed: {
    ...mapGetters(["popupDialog"]),
    status: {
      get() {
        return this.$store.state.Dialog.popupDialog.status;
      },
      set() {
        this.$store.commit("popupDialogStatus");
      }
    }
  }
};
</script>

<style scoped></style>
