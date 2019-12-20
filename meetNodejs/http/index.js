const http = require("http");
/**
 * @param {Object} req 是一个http.IncomingMessag实例
 * @param {Object} res 是一个http.ServerResponse实例
 */
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "image/jpg" });
  const r = require("fs").createReadStream("./kobe.jpg");
  r.pipe(res);
});

server.listen(3000, () => {
  console.log(`Http Server listen on 3000 🚀`);
});
