const circle = require("./circle.js");
const square = require("./square.js");

console.log(`半径为 4 的圆面积为 ${circle.area(4)}`);

const mySquare = square(2);
console.log(`The area of my square is ${mySquare.area()}`);

// console.log(require.main === module);

console.log(require.main.filename === __filename);

console.log(require.resolve("./square.js"));

console.log(require.cache);

console.log(__dirname);

console.log(require("path").dirname(__filename));

console.log(__dirname === require("path").dirname(__filename));
