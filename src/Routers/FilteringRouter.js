const Router = require('express').Router();
const authentication =  require('../middleware/auth');
const FilteringController = require('../Controllers/FilteringController')
Router.get('/',authentication,FilteringController.filter)
module.exports = Router;