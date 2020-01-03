const fs = require("fs");
const path = require("path");
const Parser = require("./Parser");
class Compiler {
  constructor(options) {
    // webpack 配置
    const { entry, output } = options;
    // 入口
    this.entry = entry;
    // 出口
    this.output = output;
    // 模块
    this.modules = [];
  }
  // 构建启动
  run() {
    const info = this.build(this.entry);
    this.modules.push(info);
    this.modules.forEach(({ dependecies }) => {
      if (dependecies) {
        for (const dependency in dependecies) {
          this.modules.push(this.build(dependecies[dependency]));
        }
      }
    });
    const dependencyGraph = this.modules.reduce(
      (graph, item) => ({
        ...graph,
        [item.filename]: {
          dependecies: item.dependecies,
          code: item.code
        }
      }),
      {}
    );
    this.generate(dependencyGraph);
  }
  build(filename) {
    const { getAst, getDependecies, getCode } = Parser;
    const ast = getAst(filename);
    const dependecies = getDependecies(ast, filename);
    const code = getCode(ast);
    return {
      filename,
      dependecies,
      code
    };
  }
  // 重写 require函数,输出bundle
  generate(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    // 定义一个立即执行函数,将生成的依赖关系图作为参数传入
    const bundle = `(function(graph){
      //  重写require函数
      function require(moduleId){ 
        function localRequire(relativePath){
          return require(graph[moduleId].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[moduleId].code);
        return exports;
      }
      // 从入口文件开始解析
      require('${this.entry}')
    })(${JSON.stringify(code)})`;

    fs.writeFileSync(filePath, bundle, "utf-8");
  }
}

module.exports = Compiler;
