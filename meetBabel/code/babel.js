const babel = require('@babel/core');

const code = `[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;
const ast = babel.transform(code, {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ]
});
console.log(ast.code);
