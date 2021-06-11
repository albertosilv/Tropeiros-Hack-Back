const Router = require('express').Router();
const AccidentsController = require('../Controllers/AccidentsController');
const authentication =  require('../middleware/auth');
const FilteringController = require('../Controllers/FilteringController')
Router.get('/', authentication, AccidentsController.index);
Router.get('/:id', authentication, AccidentsController.show);
Router.post('/', authentication, AccidentsController.store);
Router.put('/:id', authentication, AccidentsController.update);
Router.delete('/:id', authentication, AccidentsController.destroy);
Router.get('/filter',authentication,FilteringController.filter)
module.exports = Router;