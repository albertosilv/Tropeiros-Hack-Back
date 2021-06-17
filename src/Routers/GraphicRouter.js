const Router = require('express').Router();
const GraphicController = require('../Controllers/GraphicController');
const authentication =  require('../middleware/auth');
Router.get('/bairros', GraphicController.bairros);
Router.get('/tipos', GraphicController.tipos);
Router.get('/meses',GraphicController.meses)
module.exports = Router;