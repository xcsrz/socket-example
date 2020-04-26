var app = require('express')();
var http = require('http')
var server = http.Server(app);
var io = require('socket.io')(server);

var connectionCount = 0;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('client connecting');
  connectionCount++;
  socket.emit('welcome', { message: `Welcome.  My process ID is ${process.pid}.  So every time you execute "kill -s SIGIO ${process.pid}" on the server I will let you know here.`})
  io.emit('server_status', { connections: connectionCount });

  socket.on('synack', function(data) {
    console.log('client sent synack:', JSON.stringify(data));
    socket.emit('synack', { action: 'pong' });
  });

  process.on('SIGIO', function() {
    console.log("broadcasting poll event");
    socket.emit('server_event', { message: "A poll signal was just received on the server process"})
  });

  process.on('SIGTERM', function () {
    console.log("shutting down");
    io.emit('terminate', { event: "kill signal received", result: "server processes terminating"})
    server.close(function () {
      process.exit(0);
    });
  });

  socket.on('disconnect', function() {
    console.log('client disconnecting');
    connectionCount--;
    io.emit('server_status', { connections: connectionCount });
  });
});

server.listen(5000, function (err) {
  console.log('listening http://localhost:5000/');
  console.log('server process pid is ' + process.pid);
});

