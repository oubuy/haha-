var http = require('http');
var express = require('express');
var path = require('path');
var app = express(); //生成一个express实例 app
var config = require('./config');

// 模板引擎-腾讯artTemplate
app.set('views', path.join(__dirname, 'build/html')); //设置存放视图文件或者说模版文件的目录
app.use(express.static(path.join(__dirname, 'build/static'))); //设置存放 image、css、js 等静态文件的目录

app.get('/**', function (req, res) {
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'build/html/index.html'));
});

//创建http服务器
var server = http.createServer(app);

//监听端口
server.listen(config.port);
console.log('端口:' + config.port)