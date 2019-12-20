const querystring = require('querystring')

const obj = {
  url: 'github.com/webfansplz',
  name: 'null'
}

console.log(querystring.stringify(obj)) // url=github.com%2Fwebfansplz&name=null

const o = querystring.parse(`url=github.com%2Fwebfansplz&name=null`)
console.log(o.url)

const str = querystring.escape(`url=github.com%2Fwebfansplz&name=null`)
console.log(str)
console.log(querystring.parse(str)) // { 'url=github.com%2Fwebfansplz&name=null': '' }

console.log(querystring.parse(querystring.unescape(str))) // { url: 'github.com/webfansplz', name: 'null' }
