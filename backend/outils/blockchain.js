'use strict';
var CryptoJS = require("crypto-js");
var express = require("express");
var bodyParser = require('body-parser');
var WebSocket = require("ws");
var O = require("./outils");

function generateNextBlock (blockData, caller) {
    var here = O.functionNameJS();
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec blockData',blockData);

    var previousBlock = getLatestBlock();
    var nextIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);

    console.log(exiting(),'Sortie  de ',here);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};

function calculateHashForBlock (block) {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

function calculateHash (index, previousHash, timestamp, data) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};

function addBlock (newBlock,caller) {
    var here = functionNameJS ();
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec newBlock',newBlock);

    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
    }
    console.log(exiting(),'Sortie  de ',here);
};

function isValidNewBlock (newBlock, previousBlock) {
    var here = functionNameJS ();
    
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('Dans',here,'index invalide');
	console.log(exiting(),'Sortie  de ',here);
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('previousHash invalide');
	console.log(exiting(),'Sortie  de ',here);
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
        console.log('Dans',here,'hash invalide: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
	console.log(exiting(),'Sortie  de ',here);
        return false;
    }
        console.log(exiting(),'Sortie  de ',here);
    return true;
};

function broadcast_to_sockets (message, socket_a, caller) {
    var here = functionNameJS();
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec message',message);

    socket_a.forEach (soc => write(soc, message));
    console.log(exiting(),'Sortie  de ',here);
}

module.exports.broadcast_to_sockets = broadcast_to_sockets;
module.exports.calculateHash = calculateHash;
module.exports.calculateHashForBlock = calculateHashForBlock;
module.exports.calculateHashForBlock = calculateHashForBlock;
module.exports.generateNextBlock = generateNextBlock;
module.exports.isValidNewBlock = isValidNewBlock;
