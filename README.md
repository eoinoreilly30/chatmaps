## Chat Maps
Go to [chatmaps.art](https://chatmaps.art) to check it out!

#### Development
```
docker run --name peerjs -it -v ~/chat-maps/devSSL:/ssl -p 9000:9000 peerjs/peerjs-server --port 9000 --allow_discovery --sslkey /ssl/localhost.key --sslcert /ssl/localhost.crt
```

#### Production
In systemd file
```
ExecStartPre=/usr/bin/cp /etc/letsencrypt/live/chatmaps-api.0x30.in/privkey.pem /etc/letsencrypt/live/chatmaps-api.0x30.in/fullchain.pem /var/lib/chatmaps
ExecStart=/usr/bin/docker run --name peerjs -v /var/lib/chatmaps:/ssl -p 9000:9000 peerjs/peerjs-server --port 9000 --allow_discovery --sslkey /ssl/privkey.pem --sslcert /ssl/fullchain.pem
```
