// https://www.npmjs.com/package/validator
// fast and efficient way TO VALIDATE AN EMAIL AND PASSWORD :) 
// WORK SMART, LOOKS HARD :)

const validator = require('validator')

module.exports = function (data) {
    let error = {}
    //is object

    //email verval
    if (validator.isEmpty(data.email)) {
        error.email = 'Email belum diisi!'
    }

    if (!validator.isEmail(data.email)) {
        error.email = 'Alamat email tidak benar!'
    }

    //password verval
    
    if (validator.isEmpty(data.password)) {
        error.password = 'Password belum diisi!'
    }
    if (!validator.isLength(data.password, { min: 8, max: 30 })) {
        error.password = "Password harus 8 sampai dengan 32 karakter"
    }


    //username verval
    if (validator.isEmpty(data.username)) {
        error.username = 'Username belum diisi!'
    }

    if (!validator.isLength(data.username, { min: 5, max: 20 })) {
        error.username = "Username harus 5 sampai dengan 20 karakter"
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}