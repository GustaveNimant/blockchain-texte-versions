var WebSocket = require("ws");

var initP2PServer = (caller) => {
    var here = functionNameJS ();
    console.log(entering(),'Entrée dans',here,'appelé par',caller);
    
    var server = new WebSocket.Server({port: p2p_port});

    server.on('connection', ws => initConnection(ws, here));
    console.log('Dans',here,'Écoute du port websocket p2p sur : ' + p2p_port);
    console.log(exiting(),'Sortie  de ',here);
};

var initConnection = (ws, caller) => {
    var here = functionNameJS ();
    console.log('\n------ nouvelle connexion à',ws.url,'------\n');
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec (ws.url)',ws.url);
    
    sockets.push(ws);
    console.log('Dans',here,'ws.url',ws.url,'ajouté à sockets');

    initMessageHandler(ws, here);
    initErrorHandler(ws);

    console.log('Dans',here,' écriture de queryChainLengthMsg dans ws');
    write(ws, queryChainLengthMsg());
    console.log(exiting(),'Sortie  de ',here);
};

var initMessageHandler = (ws, caller) => {
    var here = functionNameJS ();
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec ws.url', ws.url);
    
    ws.on('message', (data) => {
        var message = JSON.parse(data);
        console.log('Dans',here,'Message Reçu' + JSON.stringify(message));
	console.log('Dans',here,'message.type',message.type);
        switch (message.type) {
        case MessageType.QUERY_LATEST:
	    console.log('Dans',here,'appel de responseLatestMsg');
            write(ws, responseLatestMsg());
            break;
        case MessageType.QUERY_ALL:
	    console.log('Dans',here,'appel de responseChainMsg');
            write(ws, responseChainMsg());
            break;
        case MessageType.RESPONSE_BLOCKCHAIN:
	    console.log('Dans',here,'appel de handleBlockchainResponse');
            handleBlockchainResponse(message, here);
            break;
        }
    });
    console.log(exiting(),'Sortie  de ',here);
};

var initErrorHandler = (ws) => {
    var here = functionNameJS ();
    console.log(entering(),'Entrée dans',here);
    
    var closeConnection = (ws) => {
        console.log('Dans',here,'échec de la connexion au pair ws.url' + ws.url);
        sockets.splice(sockets.indexOf(ws), 1);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
    console.log(exiting(),'Sortie  de ',here);
};


