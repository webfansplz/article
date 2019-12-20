const { URL } = require("url");

const myURL = new URL("https://github.com/webfansplz#hello");

console.log(myURL.href);

console.log(myURL.toString());

console.log(myURL.toJSON());
