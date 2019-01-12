const { transform } = require('@babel/core');

const fs = require('fs');

const before = fs.readFileSync('./before.js', 'utf8');

const res = transform(`${before}`, {
  plugins: [require('./plugin')]
});

fs.existsSync('./after.js') && fs.unlinkSync('./after.js');

fs.writeFileSync('./after.js', res.code, 'utf8');
// console.log('res', res.code);
