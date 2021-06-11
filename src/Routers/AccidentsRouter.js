const Router = require('express').Router();
const AccidentsController = require('../Controllers/AccidentsController');
const authentication =  require('../middleware/auth');
Router.get('/', authentication, AccidentsController.index);
Router.get('/:id', authentication, AccidentsController.show);
Router.post('/', authentication, AccidentsController.store);
Router.put('/:id', authentication, AccidentsController.update);
Router.delete('/:id', authentication, AccidentsController.destroy);
<<<<<<< HEAD
=======
Router.get('/filter',authentication,FilteringController.filter)
>>>>>>> cabff5bc59135120290cab4d35e4d9e61f946386
module.exports = Router;