const path = require("path");

console.log(path.dirname("/path/example/index.js"));

console.log(path.extname("/path/example/index.js"));

console.log(path.isAbsolute("/path/example/index.js"));

console.log(path.isAbsolute("."));

console.log(path.join("/path", "example", "./index.js"));

console.log(path.parse("/path/example/index.js"));

console.log(path.resolve());

console.log(path.normalize("/path///example/index.js"));

console.log(
  path.format({
    root: "/",
    dir: "/path/example",
    base: "index.js",
    ext: ".js",
    name: "index"
  })
);

console.log(path.relative("/path/example/index.js", "/path"));
