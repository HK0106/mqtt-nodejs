var aedes = require('aedes')();
var server = require('net').createServer(aedes.handle);
var port = 1997;

server.listen(port, () => {
    console.log('server listening on port', port);
});
