const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth : {
        user : "rinkesh270698@gmail.com",
        pass : "vnelxggsxxgagbxo"
    }
});

// const mailOption = {
//     from : "rinkesh270698@gmail.com",
//     // to : "arun.lal@graffersid.com",
//     to : "darshanrajput2706@gmail.com",
//     subject : "this  message by darshan singh ",
//     text : "Hello arun sir  "
// }
// module.exports = { transporter, mailOption }

module.exports = { transporter }
