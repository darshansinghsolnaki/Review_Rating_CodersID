const joi = require('@hapi/joi')
joi.objectid = require('joi-objectid')(joi)

const Schema = {

    reviewCrud : joi.object({
        userID : joi.objectid().required(),
        companyId : joi.objectid().required(),
        subject : joi.string().max(20).required(),
        review : joi.string().min(10).max(100).required(),
        rating : joi.number().integer().max(5).required()
    }).unknown(true),
    
    updatereviewCrud : joi.object({
        subject : joi.string().max(20).required(),
        review : joi.string().min(10).max(100).required(),
        rating : joi.number().integer().max(5).required()
    }).unknown(true)

}

module.exports = Schema
