export function peerIdToLatLong(peerId) {
  return peerId
    .substr(1)
    .slice(0, -1)
    .replaceAll("p", ".")
    .split("x");
}

export function addJitterToCoord(coord) {
  let max = 0.001;
  let min = 0.00001;
  let seedrandom = require("seedrandom");
  let rng = seedrandom();
  let random = rng() * (max - min) + min;
  return (coord += random);
}
