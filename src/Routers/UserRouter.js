const Router = require('express').Router()
const UserController = require('../Controllers/UserController')
const authentication =  require('../middleware/auth')


Router.post('/createUser',authentication,UserController.registerUser)
Router.post('/login',UserController.login)
Router.post('/logout',UserController.logout)

module.exports = Router