const zlib = require("zlib");
const fs = require("fs");
// 压缩
// const gzip = zlib.createGzip();
// const inp = fs.createReadStream("./zlib.txt");
// const out = fs.createWriteStream("./zlib.txt.gz");
// inp.pipe(gzip).pipe(out);
// 解压
const gunzip = zlib.createGunzip();
const inp = fs.createReadStream("./un-zlib.txt.gz");
const out = fs.createWriteStream("un-zlib.txt");
inp.pipe(gunzip).pipe(out);
