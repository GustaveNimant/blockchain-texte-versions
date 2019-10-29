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

