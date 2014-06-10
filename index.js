var express = require('express');
var app = express();
server = require('http').Server(app), 
io = require('socket.io')(server);
require('./lib/server.js')(app, io);
io.on('connection', function(socket){
    socket.on('event', function(data){});
    socket.on('disconnect', function(){});
});
server.listen(3000);
