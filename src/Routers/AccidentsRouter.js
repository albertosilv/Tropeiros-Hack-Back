const Router = require('express').Router();
const AccidentsController = require('../Controllers/AccidentsController');
const authentication =  require('../middleware/auth');

Router.get('/:id', authentication, AccidentsController.show);
Router.post('/', authentication, AccidentsController.store);
Router.get('/', authentication, AccidentsController.index);

module.exports = Router;