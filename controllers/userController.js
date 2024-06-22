const cron = require('node-cron')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User_Schema = require('../model/User_Schema');
// const user = require('../model/User_Schema')
const { transporter } = require('../service/mailService');
// const { json } = require('express');


// const sendMail = async (req, res) => {
//     transporter.sendMail(mailOption, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Email Send Succesfuly" + info.response);
//         }
//     })
// }

const userSignup = async (req, res) => {
    const userData = new User_Schema(req.body)
    const { email, password } = req.body;
    // console.log(req.body.name);
    try {
        const userExists = await User_Schema.findOne({ email: email })
        if (userExists) {
            return res.status(403).json({
                status: "Exist",
                message :"email already exit"
            })
        }
        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(password, salt);
        // const filepath = `/uploads${req.file.filename}`
        // userData.profilepic = filepath
        const loginResult = await userData.save()
        // res.json(loginResult)
        res.status(200).json({
            status : "Successs",
            message : "User created Succesfully"
        })
    } catch (error) {
        res.status(500).json({
            sattus: "Error",
            message: error.message
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const checkUser = await User_Schema.findOne({ email: email });
            if (checkUser != null) {
                const isMatch = await bcrypt.compare(password, checkUser.password);
                if (checkUser.email === email && isMatch) {
                    //generate jwt
                    const token = jwt.sign({ UserID: checkUser._id },
                        process.env.JWT_SECRET_KEY, { expiresIn: "3d" })
                    res.status(200).json({
                        status: "success",
                        message: "User login Successful",
                        "token": token
                    });
                } else {
                    res.status(404).json({
                        status: "Failed",
                        message: "User Password in not valid",
                    })
                }
            } else {
                res.status(550).json({
                    status: "Failed",
                    message: "you are not rigester user"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message : error.message
        });
    }
}

const sendUserResetPasswordEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
        const user = await User_Schema.findOne({ email: email })
        if (user) {
            const secret = user._id + process.env.JWT_SECRET_KEY
            // console.log("====>", secret);
            const token = jwt.sign({ UserID: user._id }, secret, { expiresIn: "20m" })

            const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
            // console.log("==>", user._id);
            // console.log("===>", token)
            // console.log('link:', link);
            // //  send email
            // console.log('****', user.email);
            let info = await transporter.sendMail({
                from: "rinkesh270698@gmail.com",
                to: email,
                subjet: "password Reset link ",
                text: `<a href=${link}> Click Here To Reset Password </a>`
            })
            res.status(200).json({
                status: "success",
                message: "Password Reset Email Send PLease \ Check Your Email",
                "token" : token
            })
            res.status(401).json({
                status: "Failed",
                message: "Email is required"
            })
        }
    } else {
        res.status(550).json({
            status: "Failed",
            message: "User email not found"
        })
    }
}

const userPasswordReset = async (req, res) => {
    const { password, conform_password } = req.body
    const { id, token } = req.params
    // console.log("===> ", id ,  "and", token );
    const user = await User_Schema.find
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    
    try {
        // console.log('1')
        jwt.verify(token, new_secret)
        if (password && conform_password) {
            if (password !== conform_password) {
                // console.log('2')
                res.status(550).json({
                    status : "Failed",
                    message : "password and conform password should be same "
                })
            } else {
                // console.log('3')
                const salt = await bcrypt.genSalt(10);
                const new_password = await bcrypt.hash(password, salt);
                await User_Schema.findByIdAndUpdate(user._id, { $set: { password : new_password } 
                })
                res.status(200).json({
                    status : "Success",
                    message : "Password Reset Succesfully"
                })
            }
        } else {
            res.status(204).json({
                status : "Failed",
                message : "All Field Are Required (Not Content)"
            })
        }
    } catch (error) {
        res.status(500).json({
            status :"Error",
            message : error.message
        })
    }
}

cron.schedule('17 13 * * *', () => {
    console.log(`Runing on 5pm o'clock the day `);
})
const sendmails = () => {
    console.log('hello this time is tea time ');
}
cron.schedule("15 13 * * *", function () {
    sendmails();
        console.log('hello this time is tea time ');
})


module.exports = { userSignup, userLogin, sendUserResetPasswordEmail, userPasswordReset }