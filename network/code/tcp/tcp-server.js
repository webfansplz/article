const net = require('net');

const HOST = '127.0.0.1';
const PORT = 3000;

const server = net.createServer().listen(PORT, HOST);
server.on('connection', sock => {
  console.log(sock.bytesRead);
  sock.on('data', data => {
    console.log(`received data from client :${data}`);
    sock.write('hello tcp-client');
  });
});

console.log(`Server listen on ${HOST}:${PORT}`);
