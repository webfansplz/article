const dns = require('dns')

dns.lookup(`www.github.com`, (err, address, family) => {
  if (err) throw err
  console.log('地址: %j 地址族: IPv%s', address, family)
})

dns.resolve('www.baidu.com', 'A', (err, addresses) => {
  if (err) throw err
  console.log(`IP地址 : ${JSON.stringify(addresses)}`) // IP地址 : ["163.177.151.110","163.177.151.109"]
})

dns.resolve4('www.baidu.com', (err, addresses) => {
  if (err) throw err
  console.log(`IP地址 : ${JSON.stringify(addresses)}`) // IP地址 : ["163.177.151.110","163.177.151.109"]
})

dns.lookupService('127.0.0.1', 80, function(err, hostname, service) {
  if (err) throw err
  console.log('主机名：%s，服务类型：%s', hostname, service)
})

dns.reverse('8.8.8.8', (err, domains) => {
  if (err) throw err
  console.log(domains) // [ 'dns.google' ]
})
