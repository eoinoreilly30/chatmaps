## Chat Maps
Go to [chatmaps.art](https://chatmaps.art) to check it out!

#### Development
```
docker run --name peerjs -it -v ~/chat-maps/devSSL:/ssl -p 9000:9000 peerjs/peerjs-server --port 9000 --allow_discovery --sslkey /ssl/localhost.key --sslcert /ssl/localhost.crt
```

#### Production
```
docker run --name peerjs -it -v ~/ssl:/ssl -p 9000:9000 peerjs/peerjs-server --port 9000 --allow_discovery --sslkey /ssl/privkey.pem --sslcert /ssl/fullchain.pem
```
