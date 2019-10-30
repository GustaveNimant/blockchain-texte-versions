import { WebSocket } from 'ws';
import * as shajs from 'sha.js';
import * as M from './management-outils';

export function addBlock (newBlock, previousBlock, blockchain, caller) {
let here = M.functionName ();

console.log('Entrée dans',here,'appelé par',caller,'avec newBlock',newBlock,'previousBlock',previousBlock);

if (isValidNewBlock(newBlock, previousBlock)) {
blockchain.push(newBlock);
}
console.log('Sortie de',here);
};

export function calculateHash (index, previousHash, timestamp, data) {
var stringToBeHashed = (index + previousHash + timestamp + data).toString();
var hash = shajs('sha256').update({stringToBeHashed}).digest('hex')

return hash;
};

export function calculateHashForBlock (block) {
return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
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

export function broadcast_to_sockets (message, socket_a, caller) {
    var here = M.functionName();
    console.log('Entrée dans',here,'appelé par',caller,'avec message',message);

    socket_a.forEach (soc => WebSocket.write(soc, message));
    console.log('Sortie  de ',here);
}

