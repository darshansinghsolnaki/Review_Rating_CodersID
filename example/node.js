
const sendMail = async (req, res) => {
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email Send Succesfuly" + info.response);
        }
    })
}

// this is top require --> const User_Schema = require('../model/User_Schema');
const userSignup = async (req, res) => {
    // const email = req.body.email
    const userdata = new User_Schema(req.body
        //{ name: req.body.name,
        // city: req.body.city,
        // number: req.body.number,
        // email: req.body.email,
        // password: req.body.password,
        // state: req.body.state,
        // iS_Active: req.body.iS_Active,
        // role: req.body.role}
    )
    console.log(req.body.name);
    try {
        // const { email, password } = req.body;
        // const new_user = new User_Schema(req.body);
        // const salt = await bcrypt.genSalt(10);
        // new_user.password = await bcrypt.hash(password, salt);

        //    const userExists = await user.findOne({ email: email })
        //    if (userExists) {
        //        return res.status(400).json({ status: 400, erro: "email already exit" });
        //    }
        console.log('inside try');
        const filepath = `/upload/pic ${req.file.filename}`
   userdata.profilepic = filepath
        const add = await userdata.save()
        // const add = await new_user.save()
        console.log('after try')
        res.json(add)
    } catch (err) {
        res.send('Error')
    }
}








const companyReviewDatils = async (req, res) => {
    let id = req.params.key
    console.log('api company id', id);
const company = await Company_Schema.findById(id).lean()
const comments = await review_Schema.find({'companyId': `${id}`}).populate({
    path : 'userID', select : "name profilepic"
}).populate({
    path : "companyId", select : "_id"
})
console.log('**** coment ', comments)
var data = {
    "company" : company,
    "comments" : comments   }
    res.json(data)
}





/////////////// SignUp ///////////////////////////////
const userSignups = async (req, res) => {
    const userdata = new User_Schema(req.body)
    console.log(req.body.name);
    try {
        const { email, password } = req.body;
        const new_user = new User_Schema(req.body);
        const salt = await bcrypt.genSalt(10);
        new_user.password = await bcrypt.hash(password, salt);
           const userExists = await user.findOne({ email : email })
           if (userExists) {
               return res.status(400).json({ status: 400, erro: "email already exit" });
           }
        console.log('inside try');
        const filepath = `/uploads${req.file.filename}`
        userdata.profilepic = filepath
        const add = await userdata.save()
        console.log('after try')
        res.json(add)
        
    } catch (error) {
        res.send({
            sattus : 400,
            message : error.message
        })
    }
}


//---------------///////////////////////--------{  reviewcrud   }-------------------///////////////////------------

///////////////////////------------------controler--------------////////////
const review_Schema = require('../model/review_Schema')

const createreviewCrud = async (req, res) =>{
const reviewCrudData = new review_Schema(req.body)
try {
    const addRes =await reviewCrudData.save()
    res.json(addRes)
   
} catch (error) {
    res.json({
        statsu : 400,
        message : error.message
    })
}
}
module.exports = createreviewCrud;


////////////--------------------------- schema --------------------------------------------------//////////
const mongoose = require('mongoose');

const review_Schema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user"
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        require: true,
        ref: "company"
    },
    subject: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    iS_Active: {
        type: Boolean,
        default: true
    },
})


review_Schema.set("timestamps", true)
module.exports = mongoose.model('riview', review_Schema)

////////////////////---------------------veview router----------------------------------------------////////////////
const express = require('express')
const router = express.Router()
const reviewCrudValidation = require('../validation/reviewCrud/reviewCrudValidation')
const reviewCrudController = require('../controllers/reviewCrudController')

router.post('/createreviewCrud',reviewCrudValidation.createreviewCrudValidation,reviewCrudController )


module.exports = router


////////////////////////////--------------------valisation schema--------------------//////////////
const joi = require('@hapi/joi')
joi.objectid = require('joi-objectid')(joi)

const reviewCrudValSchema = {
    reviewCrud : joi.object({
        userId : joi.objectid().required(),
        companyId : joi.objectid().required(),
        subject : joi.string().min(10).required(),
        review : joi.string().min(10).max(100).required(),
        rating : joi.number().integer().min(1).max(5).required()
    }).unknown(true)
}

module.exports = reviewCrudValSchema

/////////////////////----------------------------------validation ----------------//////////
const review = require('./reviewCrudSchema')

module.exports = {
    createreviewCrudValidation : async (req, res, next) => {
        const value = await review.reviewCrud.validate(req.body, { abortEarly : true })
        if(value.error){
            res.json({
                success : "Failed",
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    }
}

// const express = require('express')
// const router = express.Router()
// const addReviewValidation = require('../validation/reviewCrud/reviewCrudValidation')
// const creatreviewCrud = require('../controllers/reviewCrudController')

// router.post('/addreview', addReviewValidation,creatreviewCrud)

// module.exports = router;


// const express = require('express')
// const router = express.Router()
// const reviewCrudValidation = require('../validation/reviewCrud/reviewCrudValidation')
// const reviewCrudController = require('../controllers/reviewCrudController')

// router.post('/createreviewCrud',reviewCrudValidation.createreviewCrudValidation,reviewCrudController )


// module.exports = router



const addreview = async (req, res) => {
    const reviewData = new review_Schema(req.body) //unpaiting auto mating data utha lega 
    // console.log(req.body);
    try {
     const    addreviewcrud = await reviewData.save()
res.json(addreviewcrud)
res.send({
    status : 201,
    message : "Review Add Succesfull"
})
    } catch (error) {
       
    }
}

const updateApi = async (req, res) => {
    try {
        const upres = await review_Schema.findByIdAndUpdate(req.params.id, req.body, {new : true})
        // res.send(upres)
        res.json(upres)
    } catch (error) {
        res.send({
            status : 400,
            message : error.message
        })
    }
    }

    const deleteApi = async (req, res) => {
        try {
            const deleteres = await review_Schema.findByIdAndDelete(req.params.id)
            res.send({
                status : "Successfull",
                message : "Delete  User Review"
            })
        } catch (error) {
            res.send({
                status : "Failed",
                message : error.message
            })
        }
    }
    
    // const retrive  = async (req, res) => {
    //     try {
    //         const retriveres = await review_Schema.find()
    //     } catch (error) {
            
    //     }
    // }
