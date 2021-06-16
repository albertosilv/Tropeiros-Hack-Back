const Router = require('express').Router();
const authentication =  require('../middleware/auth');
const FilteringController = require('../Controllers/FilteringController')
Router.get('/accidents',authentication,FilteringController.filterAccidents)
Router.get('/users',authentication,FilteringController.filterUsers)
module.exports = Router;