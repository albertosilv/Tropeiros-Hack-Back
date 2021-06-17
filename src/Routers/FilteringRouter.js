const Router = require('express').Router();
const authentication =  require('../middleware/auth');
const FilteringController = require('../Controllers/FilteringController')
Router.get('/users',authentication,FilteringController.filterUsers)
module.exports = Router;