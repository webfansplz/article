#!/usr/bin/env node
// (C) Andrea Giammarchi - @WebReflection (ISC)
var path = require('path');
var json = path.resolve('./package.json');
var package = require(json);
var collective = package.collective;
if (!collective) process.exit(0);
if (collective.logo) {
  if (/^(https?):/.test(collective.logo))
    require(RegExp.$1)
      .get(collective.logo, function (response) {
        if (response.statusCode === 200) {
          response.setEncoding('utf8');
          var data = [];
          response.on('data', function (chunk) { data.push(chunk); });
          response.on('end', function () { showLogo(data.join('')) });
        }
        else showLogo(null);
      })
      .on('error', showLogo);
  else
    require('fs').readFile(
      path.resolve(path.dirname(json), collective.logo),
      function (err, data) {
        showLogo(err ? null : data.toString())
      }
    )
}
else showLogo(null);
function showLogo(data) {
  var logo = typeof data === 'string' ? data : '';
  var stars = '\x1B[1m***\x1B[0m';
  console.log('');
  if (logo) {
    console.log(logo);
    console.log('');
  }
  console.log('     ' + stars + ' Thank you for using ' + package.name + '! ' + stars);
  console.log('');
  console.log('Please consider donating to our open collective');
  console.log('     to help us maintain this package.');
  console.log('');
  console.log('  ' + collective.url + '/donate');
  console.log('');
  console.log('                    ' + stars);
  console.log('');
  process.exit(0);
}