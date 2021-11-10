<template>
  <div>
    <welcome-dialog />
    <call-dialog />
    <receive-dialog />
    <map-view />
  </div>
</template>

<script>
import MapView from "@/app/views/MapView";
import WelcomeDialog from "@/app/dialogs/WelcomeDialog";
import CallDialog from "@/app/dialogs/CallDialog";
import ReceiveDialog from "@/app/dialogs/ReceiveDialog";
export default {
  name: "Home",
  components: { ReceiveDialog, CallDialog, WelcomeDialog, MapView }
};
</script>

<style scoped></style>
