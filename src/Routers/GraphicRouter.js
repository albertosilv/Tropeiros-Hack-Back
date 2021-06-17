const Router = require('express').Router();
const GraphicController = require('../Controllers/GraphicController');
const authentication =  require('../middleware/auth');
Router.get('/bairros',authentication, GraphicController.bairros);
Router.get('/tipos',authentication, GraphicController.tipos);
Router.get('/meses',authentication,GraphicController.meses)
module.exports = Router;