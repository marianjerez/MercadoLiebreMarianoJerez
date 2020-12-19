var express = require('express');
var router = express.Router();


const routesController = require('../controllers/indexController');

router.get('/',routesController.vistaHome);

module.exports = router;
