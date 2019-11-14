'use strict';

var express = require("express");
var bodyParser = require('body-parser');

var WebSocket = require("ws");
var BlocController = require('../controllers/bloc.controller');
var A = require("./arrays");
var O = require("./outils");

var ModuleName = "blockchain.js";

var addBlock = (newBlock, caller) => {
    var here = O.functionNameJS (ModuleName);
    console.log('\nEntrée dans',here,'appelé par',caller,'avec newBlock',newBlock);

    if (isValidNewBlock(newBlock, getLatestBlock(), here)) {
        A.blockChain.push(newBlock);
    }
    console.log('Sortie  de',here);
};

var getGenesisBlock = () => {
    var here = O.functionNameJS(ModuleName);
    console.log('\n');
    var nextHash = O.calculateHash(0, "hash vide", nextTimestamp, "mon bloc génésis");
    var nextTimestamp = new Date().getTime() / 1000;
    var http_port = process.env.HTTP_PORT;
    var p2p_port = process.env.P2P_PORT;
    var contenu = "Bloc Genesis de websocket-blockchain http " + http_port + " p2p " + p2p_port;
    
    var result = BlocController.createBlocController ({
	index: 0,
	typeContenu: "texte",
	contenu: contenu,
	horodatage: nextTimestamp,
	auteurClePublique: "clé publique",
	hashPrecedent:"hash vide",
	hashCourant: nextHash,
    });

    console.log('Sortie  de',here,'avec result',result);
    return result;
};

var getLatestBlock = () => O.getLatestElement(A.blockChain);

var isValidChain = (blockchainToValidate) => {
    var here = O.functionNameJS(ModuleName);
    console.log('Entrée dans',here,'avec blockchainToValidate',blockchainToValidate);

    if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
	console.log('\nErreur dans',here,'blockchainToValidate[0]',blockchainToValidate[0]);
	console.log('Erreur dans',here,'mais blockGenesis',JSON.stringify(getGenesisBlock()),'\n');
        return false;
    }
    var tempBlocks = [blockchainToValidate[0]];
    for (var i = 1; i < blockchainToValidate.length; i++) {
	
        if (isValidNewBlock (blockchainToValidate[i], tempBlocks[i - 1], here)) {
	    console.log('Dans',here,'bloc #',i,'est validé');
            tempBlocks.push(blockchainToValidate[i]);
        } else {
	    console.log('Dans',here,'bloc #',i,'est invalide');
            return false;
        }
    }
    console.log('Sortie  de',here);
    return true;
};

var isValidNewBlock = (newBlock, previousBlock, caller) => {
    var here = O.functionNameJS (ModuleName);
    console.log('Entrée dans',here,'appelé par',caller,'avec newBlock',newBlock,'previousBlock',previousBlock);
    
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('Dans',here,'index invalide previousBlock.index',previousBlock.index,'newBlock.index',newBlock.index);
	('Sortie  de',here);
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('previousHash invalide');
	console.log('Sortie  de',here);
        return false;
    } else if (O.calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof O.calculateHashForBlock(newBlock));
        console.log('Dans',here,'hash invalide',O.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
	console.log('Sortie  de',here);
        return false;
    }
    console.log('Sortie  de',here,'result true');
    return true;
};

var replaceChain = (newBlocks, caller) => {
    var here = O.functionNameJS(ModuleName);
    console.log('Entrée dans',here,'appelé par',caller,'avec newBlocks',newBlocks);
    
    if (isValidChain(newBlocks) && newBlocks.length > blockChain.length) {
        console.log('La blockchain reçue est valide. Remplacer la blockchain actuelle par la blockchain reçue.');
        A.blockChain = newBlocks;
        broadcast(responseLatestMsg(), here);
    } else {
        console.log('\n!!!!! dans',here,'La blockchain reçue est invalide. !!!!!');
    }
    console.log('Sortie  de',here);
};

module.exports.addBlock = addBlock;
module.exports.getGenesisBlock = getGenesisBlock;
module.exports.getLatestBlock = getLatestBlock;
module.exports.isValidNewBlock = isValidNewBlock;
module.exports.replaceChain = replaceChain;
