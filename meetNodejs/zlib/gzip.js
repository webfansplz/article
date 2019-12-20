const fs = require("fs");
const http = require("http");
const zlib = require("zlib");
const filepath = "./index.html";

const server = http.createServer((req, res) => {
  const acceptEncoding = req.headers["accept-encoding"];
  if (acceptEncoding.includes("gzip")) {
    const gzip = zlib.createGzip();
    res.writeHead(200, {
      "Content-Encoding": "gzip"
    });
    fs.createReadStream(filepath)
      .pipe(gzip)
      .pipe(res);
  } else {
    fs.createReadStream(filepath).pipe(res);
  }
});

server.listen(4396);
