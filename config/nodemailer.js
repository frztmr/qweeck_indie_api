const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '@mail.com', //EMAIL ADDRESS
        pass: ''        // PASSWORD
    }
})

module.exports = {
    transport
}