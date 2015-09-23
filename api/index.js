var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.writeHead('Content-Type','text/html')
  res.write('<h1>this is the api</h1>')
  res.end()
})

var server = app.listen(4000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
