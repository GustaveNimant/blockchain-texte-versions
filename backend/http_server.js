const D = require('./outils/debug');
const O = require('./outils/outils');
const WS = require('./outils/websocket');

const http = require('http');
const app = require('./app');

var ModuleName = 'http_server.js';

const http_port = O.normalizePort(process.env.HTTP_PORT || '3000');
app.set('port', http_port);

const http_server = http.createServer(app);

http_server.on('error', O.errorHandler);
http_server.on('listening', () => {
    const address = http_server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + http_port;
    console.log('Ecoute sur le port HTTP "', address.port, '"');
    console.log('Le bind est "', bind, '"');
    console.log('Dans',ModuleName,'http_server.on Ecoute du port HTTP http://localhost:' + http_port);
});

http_server.listen(http_port);
