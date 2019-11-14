const dgram = require('dgram');

const udpServer = dgram.createSocket('udp4').bind(4396);

udpServer.on('listening', () => {
  console.log('udp server listen on 4396');
});

udpServer.on('message', (msg, { address, port }) => {
  console.log(`received data from udp-client:${msg.toString()}`);
  udpServer.send('hello,udp-client!', port, address);
});
