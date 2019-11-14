const D = require('../outils/debug');
const O = require('../outils/outils');
const WS = require('../outils/websocket');

var ModuleName = 'p2p_server.js';

const p2p_port = O.normalizePort (process.env.P2P_PORT || '6000');

const p2p_server = WS.initP2PServerOfPort(p2p_port, ModulName);

p2p_server.on('error', O.errorHandler);
p2p_server.on('listening', () => {
    const address = p2p_server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + p2p_port;
    console.log('Ecoute sur le port "', address.port, '"');
    console.log('Le bind est "', bind, '"');
    console.log('dans',ModuleName,'p2p_server.on Ecoute du port WebSocket P2P http://localhost:' + p2p_port);
});

p2p_server.listen(p2p_port);
