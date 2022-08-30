const express = require('express')
const route = express.Router();
const { authController } = require('../controller')

route.get('/all', authController.getData)

//for login
route.post('/login', authController.login)

//for register
route.post('/register', authController.register)

//for keepLoginn
route.get('/keepLogin', authController.keepLogin)

route.post('/check',authController.usernameChecker)

module.exports = route;