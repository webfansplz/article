const only = require('only');
const girlInfo = {
  name: 'lily',
  age: 25,
  weight: 88
};
const lily = only(girlInfo, ['name']);
console.log(lily); //  lily
const letMeSee = only(girlInfo, ['age', 'weight']);
console.log(letMeSee); //  { age: 25, weight: 88 }
