## Chat Maps
ChatMaps is a peer to peer voice calling app. It uses [PeerJS](https://peerjs.com/) for voice calling between 
users and VueJS as the frontend framework. Users appear as purple dots on the map, click on them to call them.

Go to [chatmaps.0x30.in](https://chatmaps.0x30.in) to check it out!

#### Development
Run peer server
```
docker run --name peerjs -it -v ~/chat-maps/devSSL:/ssl -p 9000:9000 peerjs/peerjs-server --port 9000 --allow_discovery --sslkey /ssl/localhost.key --sslcert /ssl/localhost.crt
```
Serve app
```
npm run serve
```
