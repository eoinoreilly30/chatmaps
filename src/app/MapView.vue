<template>
  <!--  <div id="map" style="height: 88%"></div>-->
  <div>
    <v-card flat>
      <v-card-text> My ID: {{ id }} </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title>
        Peers:
      </v-card-title>
      <v-card-text>
        <div v-for="peer in peers" :key="peer">
          {{ peer }}
        </div>
      </v-card-text>
    </v-card>
    <!--    <v-card flat>-->
    <!--      <v-card-text>-->
    <!--        <v-row>-->
    <!--          <v-col>-->
    <!--            <v-text-field-->
    <!--              label="Message receiver"-->
    <!--              v-model="messageReceiverId"-->
    <!--            />-->
    <!--          </v-col>-->
    <!--          <v-col class="shrink">-->
    <!--            <v-btn @click="_connectMessage">-->
    <!--              Connect-->
    <!--            </v-btn>-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--        <v-row>-->
    <!--          <v-col>-->
    <!--            <v-text-field label="Message" v-model="message" />-->
    <!--          </v-col>-->
    <!--          <v-col class="shrink">-->
    <!--            <v-btn @click="_sendMessage">-->
    <!--              Send-->
    <!--            </v-btn>-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--      </v-card-text>-->
    <!--    </v-card>-->
    <!--    <v-card flat>-->
    <!--      <v-card-title>-->
    <!--        Received:-->
    <!--      </v-card-title>-->
    <!--      <v-card-text>-->
    <!--        <div v-for="(message, i) in messages" :key="i">-->
    <!--          {{ message }}-->
    <!--        </div>-->
    <!--      </v-card-text>-->
    <!--    </v-card>-->
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Call receiver" v-model="callReceiverId" />
          </v-col>
          <v-col class="shrink">
            <v-btn @click="_connectCall">
              Connect
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <audio />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MapView",
  data() {
    return {
      messageReceiverId: "",
      message: "",
      callReceiverId: ""
    };
  },
  computed: {
    ...mapGetters(["id", "peers", "messages"])
  },
  beforeMount() {
    this.init();
    setInterval(this.getPeers, 2000);
  },
  beforeDestroy() {
    this.destroy();
  },
  // mounted() {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.myPosition.lat = position.coords.latitude;
  //     this.myPosition.long = position.coords.longitude;
  //
  //     // eslint-disable
  //     // eslint-disable-next-line no-undef
  //     this.map = L.map("map").setView(
  //       [this.myPosition.lat, this.myPosition.long],
  //       13
  //     );
  //
  //     //eslint-enable
  //     // eslint-disable-next-line
  //     L.tileLayer(
  //       "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW9pbm9yZWlsbHkzMCIsImEiOiJja2p5emVhbmcwMml1MnN0Zzdqd2p2cGU5In0.AciktlS6oKhpDWlJlyBDoA",
  //       {
  //         maxZoom: 18,
  //         id: "mapbox/streets-v11",
  //         tileSize: 512,
  //         zoomOffset: -1
  //       }
  //     ).addTo(this.map);
  //
  //     // eslint-disable-next-line
  //     L.circleMarker([this.myPosition.lat, this.myPosition.long], {
  //       color: "black",
  //       fillColor: "#FCA156",
  //       weight: 1,
  //       fillOpacity: 1,
  //       radius: 10,
  //       id: "test"
  //     }).addTo(this.map);
  //   });
  //
  // },
  methods: {
    ...mapActions([
      "init",
      "destroy",
      "getPeers",
      "connectMessage",
      "sendMessage",
      "connectCall"
    ]),
    _connectMessage() {
      this.connectMessage(this.messageReceiverId);
    },
    _sendMessage() {
      this.sendMessage(this.message);
      this.message = "";
    },
    _connectCall() {
      this.connectCall(this.callReceiverId);
    },
    getLocation(id) {
      let conn = this.myPeer.connect(id);
      conn.on("open", () => {
        conn.send(this.myPosition);
      });
    },
    drawMarkers(positions) {
      Object.keys(positions).map(key => {
        // eslint-disable-next-line
        let circle = L
          .circleMarker([positions[key].lat, positions[key].long], {
          color: "black",
          fillColor: "#ff00ff",
          weight: 1,
          fillOpacity: 1,
          radius: 10,
          id: key
        }).addTo(this.map);

        circle.on("click", function() {
          console.log(this.options.id);
        });
      });
    }
  }
};
</script>
