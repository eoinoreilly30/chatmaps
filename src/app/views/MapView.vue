<template>
  <div id="map" style="height: 100vh" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MapView",
  computed: {
    ...mapGetters(["peers", "position"])
  },
  data() {
    return {
      map: null
    };
  },
  watch: {
    position() {
      let lat = this.position.coords.latitude;
      let long = this.position.coords.longitude;
      // eslint-disable-next-line
      this.map.setView([lat, long], 7);
      // eslint-disable-next-line
      L.marker([lat, long]).addTo(this.map).bindTooltip("This is you!", { direction: "top" });
    },
    peers() {
      this.peers.map(peerId => {
        let [lat, long] = peerId
          .substr(1)
          .slice(0, -1)
          .replaceAll("p", ".")
          .split("x");

        // eslint-disable-next-line
        let peerMarker = L
            .circleMarker([lat, long], {
          color: "black",
          fillColor: "#ff00ff",
          weight: 1,
          fillOpacity: 1,
          radius: 12,
          id: peerId
        }).addTo(this.map);

        peerMarker.on("click", () => {
          this.connectCall(peerId);
        });

        peerMarker.bindTooltip("Click to call", { direction: "top" });
      });
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.map = L.map("map").setView([51, 0], 4);
    // eslint-disable-next-line
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW9pbm9yZWlsbHkzMCIsImEiOiJja2p5emVhbmcwMml1MnN0Zzdqd2p2cGU5In0.AciktlS6oKhpDWlJlyBDoA",
      {
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1
      }
    ).addTo(this.map);
  },
  methods: {
    ...mapActions(["connectCall"])
  }
};
</script>
