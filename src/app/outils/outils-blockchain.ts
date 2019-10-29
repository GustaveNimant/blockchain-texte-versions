import { WebSocket } from 'ws';
import * as shajs from 'sha.js';
import * as M from './outils-management';

export function calculateHashForBlock (block) {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

export function calculateHash (index, previousHash, timestamp, data) {
    var stringToBeHashed = (index + previousHash + timestamp + data).toString();
    var hash = shajs('sha256').update({stringToBeHashed}).digest('hex')
    
    return hash;
};

export function addBlock (newBlock, previousBlock, blockchain, caller) {
    let here = M.functionName ();
    
    console.log('Entrée dans',here,'appelé par',caller,'avec newBlock',newBlock,'previousBlock',previousBlock);

    if (isValidNewBlock(newBlock, previousBlock)) {
        blockchain.push(newBlock);
    }
    console.log('Sortie de',here);
};

export function createSha (str:string, typeSha:string, formatInput: string, formatOutput: string) {
    let here = M.functionName ();
    
    const TS = typeSha.toUpperCase();
    const FI = formatInput.toUpperCase();
    const FO = formatOutput.toUpperCase();
    
    switch (TS) {
	case "SHA-1":
	case "SHA-224":
	case "SHA3-224":
	case "SHA-256":
	case "SHA3-256":
	case "SHA-384":
	case "SHA3-384":
	case "SHA-512":
	case "SHA3-512":
	case "SHAKE128":
	case "SHAKE256":
	    break;
	default:
	    console.log('Dans',here,'le type de SHA illégal',TS);
	    break;
    }
    
    switch (FI) {
	case "TEXT":
	    break;
	default:
	    console.log('Dans',here,'le format d\'Input de SHA illégal',FI);
	    break;
    }
    
    switch (FO) {
	case "HEX":
	    break;
	default:
	    console.log('Dans',here,'le format d\'Output de SHA illégal',FO);
	    break;
    }
    
    const hash = shajs(typeSha).update({str}).digest(formatOutput)
    return hash;
    
}

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

