const express = require('express')
const route = express.Router();
const { authController } = require('../controller');
const auth = require('../controller/auth');

route.get('/all', authController.getData)

//for login
route.post('/login', authController.login)

//for register
route.post('/register', authController.register)

//for keepLoginn
route.get('/keepLogin', authController.keepLogin)

route.post('/check',authController.usernameChecker)

//untuk posting apa itu ya gatau lupa. 
route.post('/post', authController.post)

route.post('/edit', authController.edit)

route.post('/delete', authController.delete)

route.post("/profile", authController.profile)

route.post("/like", authController.like)

route.post("/unlike", authController.unlike)

route.post("/comment", authController.comment)

route.get("/getpost", authController.getPost)

route.get("/alluser", authController.getPost)




module.exports = route;