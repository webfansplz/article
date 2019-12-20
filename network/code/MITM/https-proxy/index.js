const http = require("http");
const https = require("https");
const tls = require("tls");
const { URL } = require("url");
const net = require("net");
const CAServices = require("./CAServices");
const port = 3333;

function createHttpsServer(domain, cb) {
  const { caCert, caKey } = CAServices.read();
  const options = CAServices.generateSetting(domain).generateKey(caKey, caCert);
  const httpsServer = new https.Server({
    key: options.keyPem,
    cert: options.certPem,
    SNICallback: (hostname, done) => {
      const options = CAServices.generateSetting(hostname).generateKey(
        caKey,
        caCert
      );
      done(
        null,
        tls.createSecureContext({
          key: options.keyPem,
          cert: options.certPem
        })
      );
    }
  });
  httpsServer.listen(0, () => {
    const address = httpsServer.address();
    cb(address.port);
  });
  httpsServer.on("request", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end(`我是webfansplz伪造的https://${req.headers.host}网站～`);
  });
}
// 创建 HTTP 隧道代理。
const httpTunnel = new http.Server();
httpTunnel.on("connect", (req, cltSocket, head) => {
  const { hostname } = new URL(`http://${req.url}`);
  createHttpsServer(hostname, port => {
    const srvSocket = net.connect(port, "127.0.0.1", () => {
      cltSocket.write(
        "HTTP/1.1 200 Connection Established\r\n" +
          "Proxy-agent: Https-Mitm-Proxy\r\n" +
          "\r\n"
      );
      srvSocket.write(head);
      srvSocket.pipe(cltSocket);
      cltSocket.pipe(srvSocket);
    });
  });
});
httpTunnel.listen(port, () => {
  console.log(`https MITM proxy server listen on ${port}`);
});
