const Router = require('express').Router();
const AccidentsController = require('../Controllers/AccidentsController');
const authentication =  require('../middleware/auth');
Router.get('/', authentication, AccidentsController.index);
Router.get('/:id', authentication, AccidentsController.show);
Router.post('/', authentication, AccidentsController.store);
Router.put('/:id', authentication, AccidentsController.update);
Router.delete('/:id', authentication, AccidentsController.destroy);
module.exports = Router;