const Crypto = require('crypto')

module.exports = {
    hashPassword:(pass)=>{
        return Crypto.createHmac("sha256",process.env.ENCRYPT_PASS).update(pass).digest('hex');
    }
}