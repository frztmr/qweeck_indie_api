const { dbConf } = require('../config/db')
const { hashPassword, createToken } = require('../config/encrypts')
const { transport } = require('../config/nodemailer');

// const time = getTime
// const getTime = new Date().getTime()



module.exports = {
    getData: (req, res) => {
        dbConf.query(`SELECT * FROM users;`,
            (err, results) => {
                if (err) {
                    console.log('ERROR QUERY SQL', err)
                    res.status(500).send(err);
                }
                console.log('RESULTS', results);
                res.status(200).send(results);
            })
    },

    getPost: (req, res) => {
        dbConf.query(`SELECT * FROM post;`,
            (err, results) => {
                if (err) {
                    console.log('ERROR QUERY SQL', err)
                    res.status(500).send(err);
                }
                console.log('RESULTS', results);
                res.status(200).send(results);
                
            })
    },

    getUser: (req, res) => {
        dbConf.query(`SELECT * FROM users;`,
            (err, results) => {
                if (err) {
                    console.log('ERROR QUERY SQL', err)
                    res.status(500).send(err);
                }
                console.log('RESULTS', results);
                res.status(200).send(results);
                results
            })
    },

    post: (req, res) => {
        console.log(req.body);
        let {
            username,
            time,
            text,
            imgRef,
        } = req.body;
        dbConf.query(
            `INSERT INTO post (username, time, text, imgRef ) 
            values (${dbConf.escape(username)}, ${dbConf.escape(time)},  
            ${dbConf.escape(text)}, ${dbConf.escape(imgRef)});`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'Post success',
                    results: results
                })
            }
        )
    },

    edit: (req, res) => {
        console.log(req.body);
        let {
            idpost,
            text,
        } = req.body;
        dbConf.query(
            `UPDATE post SET ${dbConf.escape(text)} WHERE ${dbConf.escape(idpost)};`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'Edit Post success',
                    results: results
                })
            }
        )
    },
    delete: (req, res) => {
        console.log(req.body);
        let {
            username,
            // following,
            // followers
        } = req.body;
        dbConf.query(
            `DELETE FROM reaction WHERE comment=${dbConf.escape(username)};`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'DELETE post success',
                    results: results
                })
            }
        )
    },
    

    profile: (req, res) => {
        console.log(req.body);
        let {  
            username,
            pict,
            status,
            // following,
            // followers
        } = req.body;
        dbConf.query(
            `INSERT INTO profile (username, pict, status,) 
            values (${dbConf.escape(username)},  
            ${dbConf.escape(pict)}, ${dbConf.escape(status)});`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'profiling success',
                    results: results
                })
            }
        )
    },
    like: (req, res) => {
        console.log(req.body);
        let {
            username,
            // following,
            // followers
        } = req.body;
        dbConf.query(
            `INSERT INTO reaction (like) 
            values (${dbConf.escape(username)});`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'add like success',
                    results: results
                })
            }
        )
    },
    unlike: (req, res) => {
        console.log(req.body);
        let {
            username,
            // following,
            // followers
        } = req.body;
        dbConf.query(
            `DELETE FROM reaction WHERE like=${dbConf.escape(username)};`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'add like success',
                    results: results
                })
            }
        )
    },
    comment: (req, res) => {
        console.log(req.body);
        let {
            
            username,
            comment
            
            // following,
            // followers
        } = req.body;
        dbConf.query(
            `INSERT INTO reaction (username, comment) 
            values (${dbConf.escape(username)}, ${dbConf.escape(comment)});`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'add like success',
                    results: results
                })
            }
        )
    },
    register: (req, res) => {
        console.log(req.body);
        let {
            email,
            username,
            password
        } = req.body;
        dbConf.query(
            `INSERT INTO USERS (username, email, password ) 
            values (${dbConf.escape(username)}, ${dbConf.escape(email)},  
            ${dbConf.escape(hashPassword(password))});`,
            (err, results) => {
                if (err) {
                    console.log('Error QUERY SQL:', err);
                    res.status(500).send(err)
                }
                res.status(200).send({
                    success: true,
                    message: 'register success',
                    results: results
                })
            }
        )
    },
    login: (req, res) => {
        let { username, password } = req.body;
        dbConf.query(
            `SELECT * FROM users WHERE username=${dbConf.escape(username)} 
            AND password=${dbConf.escape(hashPassword(password))};`,
            (err, results) => {
                if (!results) {
                    res.status(500).send(err)
                } res.status(200).send(
                    results
                )
                // if (err) {
                //     console.log('Error query SQL :', err);
                //     res.status(500).send(err);
                // } res.status(200).send({
                //     if(results = false) {
                //         false
                //     }
                // })

                // dbConf.query(`SELECT * FROM users WHERE username=${dbConf.escape(username)} 
                // AND password=${dbConf.escape(hashPassword(password))};`,
                //     (errCart, resultsCart) => {
                //         if (errCart) {
                //             console.log('Error query SQL :', errCart);
                //             res.status(500).send(errCart);
                //         }

                //         res.status(200).send({
                //             ...results[0],


                //         })

                //     })
            })
    },
    keepLogin: async (req, res) => {
        try {
            let resultsUser = await dbQuery(`Select * FROM users 
            WHERE username=${dbConf.escape(req.dataToken.username)};`)

            if (resultsUser.length > 0) {
                // let resultsCart = await dbQuery(`Select u.iduser, p.idproduct, p.name, p.images, p.brand, 
                // p.category, p.price, c.qty, p.price*c.qty as totalPrice from users u
                // JOIN carts c ON u.iduser=c.user_id
                // JOIN products p ON p.idproduct = c.product_id 
                // WHERE username=${dbConf.escape(resultsUser[0].username)};`)

                let token = createToken({ ...resultsUser[0] });
                res.status(200).send({
                    ...resultsUser[0],
                    // cart: resultsCart,
                    token
                })
            }
        } catch (error) {
            console.log('Error query SQL :', error);
            res.status(500).send(error);
        }
    },
    usernameChecker: (req, res) => {
        let { username } = req.body;
        dbConf.query(
            `SELECT * FROM users WHERE username=${dbConf.escape(username)};`,
            (err, results) => {
                if (!results) {
                    res.status(500).send(err)
                } res.status(200).send(
                    results
                )
            })
    },

    verification: async (req, res) => {
        try {
            console.log(req.dataToken)
            if (req.dataToken.username) {
                //    1. update status user, yang awalnya unverified menjadi Verify
                await dbQuery(`UPDATE users set status_id=1 WHERE iduser=${dbConf.escape(req.dataToken.username)};`);
                // 2. proses login 
                let resultsUser = await dbQuery(`Select u.iduser, u.username, u.email, u.age, u.city, u.role, u.status_id, s.status from users u 
                JOIN status s on u.status_id = s.idstatus WHERE iduser=${dbConf.escape(req.dataToken.username)};`);
                if (resultsUser.length > 0) {
                    // 3. login berhasil, maka kita buat token baru
                    let token = createToken({ ...resultsUser[0] });
                    res.status(200).send(
                        {
                            success: true,
                            messages: "Verify Success ✅",
                            dataLogin: {
                                ...resultsUser[0],
                                token
                            },
                            error: ""
                        }
                    )
                }
            } else {
                res.status(401).send({
                    success: false,
                    messages: "Verify Failed ❌",
                    dataLogin: {},
                    error: ""
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "Failed ❌",
                error
            });
        }
    }
}