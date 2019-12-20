const dgram = require('dgram');

const clientServer = dgram.createSocket('udp4');

const message = Buffer.from('hello,udp-server!');
clientServer.send(message, 4396);

clientServer.on('message', msg => {
  console.log(`received data from udp-server:${msg.toString()}`);
});
