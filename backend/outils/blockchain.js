
module.exports = function generateNextBlock (blockData, caller) {
    var here = functionNameJS();
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec blockData',blockData);

    var previousBlock = getLatestBlock();
    var nextIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);

    console.log(exiting(),'Sortie  de ',here);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};

var calculateHashForBlock = (block) => {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

var calculateHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};

var addBlock = (newBlock,caller) => {
    var here = functionNameJS ();
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec newBlock',newBlock);

    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
    }
    console.log(exiting(),'Sortie  de ',here);
};

var isValidNewBlock = (newBlock, previousBlock) => {
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

var functionNameJS = () => {
    var stack = new Error().stack;
    var caller = (stack.split('at ')[2]).split(' ')[0];
    return caller;
}

var broadcast = (message,caller) => {
    var here = functionNameJS();
    console.log(entering(),'Entrée dans',here,'appelé par',caller,'avec message',message);

    sockets.forEach(socket => write(socket, message));
    console.log(exiting(),'Sortie  de ',here);
}

