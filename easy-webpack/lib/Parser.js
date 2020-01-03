const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
const Parser = {
  getAst: path => {
    const content = fs.readFileSync(path, "utf-8");
    return parser.parse(content, {
      sourceType: "module"
    });
  },
  getDependecies: (ast, filename) => {
    const dependecies = {};
    // 遍历所有的 import 模块,存入dependecies
    traverse(ast, {
      // 类型为 ImportDeclaration 的 AST 节点 (import 语句)
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        // 依赖模块
        const filepath = "./" + path.join(dirname, node.source.value);
        dependecies[node.source.value] = filepath;
      }
    });
    return dependecies;
  },
  getCode: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    });
    return code;
  }
};

module.exports = Parser;
