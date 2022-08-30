
//MAIN CONFIG
const express = require('express');
const dotenv = require('dotenv');
const App = express();
const cors = require('cors');
const checkPassword = require('./checkEngine')
dotenv.config();
App.use(express.json());
App.use(cors());

//CONFIGURE ROUTERS
const { authRouter } = require('./routers');
const { connection } = require('mongoose');
App.use('/auth', authRouter)

//LISTEN TO THE PORT
App.listen(process.env.PORT)
console.log(`app is running at Port ${process.env.PORT}`)

//TEST APP
App.get('/', (req, res) => {
    res.status(200).send('MONGO API NODE JS')
})

//DB CONNECTION CHECK
const { dbConf } = require('./config/db')
dbConf.getConnection((error, connection) => {
    if (error) {
        console.log("Error db Connection!", error.sqlMessage)
    }
    console.log(`DB has been connected ${connection.threadId}`)
})


//FIND USERNAME IN GLOBAL (MYSQL UNCHECK)
// App.get('/users', (req, res) => {
//     userCollection.find(req.query, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.status(200).send(data);
//     })
// })

//SPESIFIC USERNAME FOR CREATE ACC (MYSQL UNCHECK)
// App.get('/users', (req, res) => {
//     userCollection.findOne({ username: req.body.username })
//         .then(user => {
//             if (user) {
//                 error.username = "username sudah digunakan :("
//                 return res.status(500).json(error)
//             }
//         })

// })









//===============MONGODB AREA========================

//MONGO CONFIG
// const mongoose = require('mongoose')
// const { mongoAccessURL,
// userCollection } = require('./config/mongo')
// mongoose.connect(process.env.ACCESS_AUTH, () => {
//     console.log("mongo connection is ok")
// })

//ROUTING
//App.use('users',usersRouter)

//FIND USERNAME IN GLOBAL (MONGO)
// App.get('/users', (req, res) => {
//     userCollection.find(req.query, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.status(200).send(data);
//     })
// })




//SPESIFIC USERNAME FOR CREATE ACC (MONGODB)
// App.get('/users', (req, res) => {
//     userCollection.findOne({ username: req.body.username })
//         .then(user => {
//             if (user) {
//                 error.username = "username sudah digunakan :("
//                 return res.status(500).json(error)
//             }
//         })

// })



//POST (CREATE AN ACCOUNT) VIA MONGODB
// App.post('/users', (req, res) => {
//     //===============default================
//     userCollection(req.body).save()
//         .then((results) => {
//             res.status(200).send({
//                 success: true,
//                 results: results
//             });
//         }).catch((err) => {
//             res.status(500).send(err)
//         })
//     //=============end default==============

//     // const { isValid, error } = checkPassword(req.body)

//     // if (!isValid) {
//     //     return res.status(400).json(error)
//     // }

//     // userCollection.findOne({ username: req.body.username })
//     //     .then(user => {
//     //         if (user) {
//     //             error.username = "username sudah digunakan :("
//     //             return res.status(500).json(error)
//     //         }

//     //         // PASSWORD HASH TAPI GABISA WWKKWK
//     //         // bcrypt.genSalt(10, function (err, salt) {
//     //         //     bcypt.hash(req.body.password, salt, function(err,hash){
//     //         //         const newUser = new userCollection({
//     //         //             email: req.body.email,
//     //         //             username: req.body.username,
//     //         //             password: hash
//     //         //         })
//     //         userCollection(req.body).save()
//     //             .then((results) => {
//     //                 res.status(200).send({
//     //                     success: true,
//     //                     results: results
//     //                 });
//     //             }).catch((err) => {
//     //                 res.status(500).send(err)
//     //             })

//     //         //     })
//     //         // })
//     //     })
// })

