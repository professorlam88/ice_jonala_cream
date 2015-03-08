var http = require('http');
var request = require('request');
var querystring = require('querystring');
var url = require('url');
var https = require('https');
var xmldoc = require('xmldoc');
var validator = require('email-validator');
var send = require('send');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var port = process.env.PORT || 5000;
 
http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  var queryData = url.parse(req.url, true).query;

  var queryDataPathname = url.parse(req.url);
  var pathname = queryDataPathname.pathname;

  switch(pathname) { // req.url

    case '/input':

      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write('Herro');
      res.end();

    break;

    default:

      // your custom error-handling logic:
      function error(err) {
        res.statusCode = err.status || 500;
        res.end(err.message);
      }

      // your custom directory handling logic:
      function redirect() {
        res.statusCode = 301;
        res.setHeader('Location', req.url + '/');
        res.end('Redirecting to ' + req.url + '/');
      }

      // transfer arbitrary files from within
      // /www/example.com/public/*
      send(req, url.parse(req.url).pathname)
      .root('./app')
      .on('error', error)
      .on('directory', redirect)
      .pipe(res);


  }      
 
}).listen(port);