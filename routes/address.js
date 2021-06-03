const express = require('express');
const controller = require('../controllers/title')
let router = express.Router();

router.get('/', controller.fetchTitlesFromUrl)
module.exports = router