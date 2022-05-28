const fs = require('fs');
const { PeerServer } = require('peer');

PeerServer({
    port: 9000,
    allow_discovery: true,
    ssl: {
        key: fs.readFileSync('/home/eoin/ssl/privkey.pem'),
        cert: fs.readFileSync('/home/eoin/ssl/fullchain.pem')
    }
});
