const express = require('express');
const router = express.Router();

const blockchainController = require('../controllers/blockchain.controller');

router.get('/', blockchainController.getBlockchainController);
router.post('/', blockchainController.submitBlockchainController);

module.exports = router;
