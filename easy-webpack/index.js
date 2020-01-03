const Complier = require("./lib/Compiler");
const options = require("./webpack.config");
new Complier(options).run();
