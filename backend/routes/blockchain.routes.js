const express = require('express');
const router = express.Router();

const blockchainCtrl = require('../controllers/blockchainCtrl');

router.get('/', blockchainCtrl.getBlockchainCtrl);
router.post('/', blockchainCtrl.submitBlockchainCtrl);

module.exports = router;
