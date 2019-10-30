import { WebSocket } from 'ws';
import { BlocModel }    from '../models/bloc.model';
import * as shajs from 'sha.js';
import * as M from './management-outils';

var MessageType = {
    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
};

export function addBlock (newBlock, previousBlock, blockchain, caller) {
    let here = M.functionName ();

    console.log('Entrée dans',here,'appelé par',caller,'avec newBlock',newBlock,'previousBlock',previousBlock);

    if (isValidNewBlock(newBlock, previousBlock)) {
	blockchain.push(newBlock);
    }
    console.log('Sortie de',here);
};

export function broadcastMessageToSockets (message, socket_a, caller) {
    var here = M.functionName();
    console.log('Entrée dans',here,'appelé par',caller,'avec message',message);

    socket_a.forEach (soc => write(soc, message));
    console.log('Sortie  de ',here);
}

export function calculateHash (index, previousHash, timestamp, data) {
    var stringToBeHashed = (index + previousHash + timestamp + data).toString();
    var hash = shajs('sha256').update({stringToBeHashed}).digest('hex')

    return hash;
};

export function calculateHashForBlock (block) {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

export function getLatestBlock (blockchain) { blockchain[blockchain.length - 1];}

export function isGenesisBlock (block:BlocModel):boolean {
    let here = M.functionName();
    console.log('Entrée dans',here,'avec block',block);

    let result = block.hashPrecedent === "BLOC GENESIS";
    return result;
}

export function isValidChain (blockchainToValidate) {
    let here = M.functionName();
    console.log('Entrée dans',here,'avec blockchainToValidate',blockchainToValidate);
    
    if ( !isGenesisBlock(blockchainToValidate[0])) {
        return false;
    }
    var tempBlocks = [blockchainToValidate[0]];
    for (var i = 1; i < blockchainToValidate.length; i++) {
        if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
            tempBlocks.push(blockchainToValidate[i]);
        } else {
            return false;
        }
    }
    console.log('Sortie  de ',here);
    return true;
};

export function isValidNewBlock (newBlock, previousBlock) {
    var here = M.functionName ();

    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('Dans',here,'index invalide');
	console.log('Sortie  de ',here);
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('previousHash invalide');
	console.log('Sortie  de ',here);
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
        console.log('Dans',here,'hash invalide: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
	console.log('Sortie  de ',here);
        return false;
    }
    console.log('Sortie  de ',here);
    return true;
};

export function replaceChain (newBlocks, socket_a, blockchain) {
    var here = M.functionName();
    console.log('Entrée dans',here,'avec newBlocks',newBlocks,'socket_a',socket_a);
    
    if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
        console.log('La blockchain reçue est valide. Remplacer la blockchain actuelle par la blockchain reçue.');
        blockchain = newBlocks;
        broadcastMessageToSockets(responseLatestMsg(blockchain), socket_a, here);
    } else {
        console.log('Dans',here,'La blockchain reçue est invalide.');
    }
    console.log('Sortie  de ',here);
};

export function responseChainMsg (blockchain) {
    var message = {
	'type': MessageType.RESPONSE_BLOCKCHAIN,
	'data': JSON.stringify(blockchain)
    };

    return message;
}

export function responseLatestMsg (blockchain) { ({
    'type': MessageType.RESPONSE_BLOCKCHAIN,
    'data': JSON.stringify([ getLatestBlock(blockchain)])
})};

export function write (ws, message) { ws.send(JSON.stringify(message))};

