<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    navigator.geolocation.getCurrentPosition(position => {
      // eslint-disable-next-line
      let leaflet = L
      let lat = position.coords.latitude
      let long = position.coords.longitude

      let map = leaflet.map('map').setView([lat, long], 13);

      leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW9pbm9yZWlsbHkzMCIsImEiOiJja2p5emVhbmcwMml1MnN0Zzdqd2p2cGU5In0.AciktlS6oKhpDWlJlyBDoA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(map);

      let circle = leaflet.circleMarker([lat, long], {
        color: 'black',
        fillColor: '#FCA156',
        weight: 1,
        fillOpacity: 1,
        radius: 10
      }).addTo(map);

      circle.bindPopup("I am a circle.");
    })
  }
}
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
