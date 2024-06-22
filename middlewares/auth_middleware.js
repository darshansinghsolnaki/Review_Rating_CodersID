const jwt = require('jsonwebtoken')
const User = require('../model/User_Schema')

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.starteWith('Bearer')) {
        try {
            token = authorization.splite(" ")[1];
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(userID).select('-password');
            next();
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
        if(!token){
            res.status(401).send({
                status : "Failed",
                message : "Unauthorized user no token"
            })
        }
    }
}

module.exports = checkUserAuth;
