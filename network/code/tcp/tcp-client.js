const net = require('net');

const HOST = '127.0.0.1';
const PORT = 3000;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('connected to server!');
  client.write('hello tcp-server');
});
client.on('data', function(data) {
  console.log('received data from server is :' + data);
});
