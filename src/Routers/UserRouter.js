const Router = require('express').Router()
const UserController = require('../Controllers/UserController')
const LoginController = require('../Controllers/LoginController')
const authentication =  require('../middleware/auth')


Router.post('/login',LoginController.login)
Router.post('/logout',authentication,LoginController.logout)

Router.get('/:id',authentication,UserController.show)
Router.get('/',authentication,UserController.index)
Router.post('/:id',authentication,UserController.store)
Router.put('/:id',authentication,UserController.update)
Router.delete('/:id',authentication,UserController.destroy)


module.exports = Router