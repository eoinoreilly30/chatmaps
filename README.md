## Chat Maps
[chatmaps-75d1d.web.app](https://chatmaps-75d1d.web.app)

A peer to peer voice calling app.  
Uses [PeerJS](https://peerjs.com/) for voice calling between users and VueJS as the frontend framework.  
Users appear as purple dots on the map, click on them to call them.

#### Development
Run peer server
```
docker run --name peerjs -it -v ~/chat-maps/devSSL:/ssl -p 9000:9000 peerjs/peerjs-server --port 9000 --allow_discovery --sslkey /ssl/localhost.key --sslcert /ssl/localhost.crt
```
Serve app
```
npm run serve
```
