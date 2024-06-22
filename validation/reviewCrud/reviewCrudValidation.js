const Schema = require('./reviewCrudSchema')

const reviewCrudValidation = async (req, res, next) => {
    const value = await Schema.reviewCrud.validate(req.body, {abortEarly : true})
    if(value.error){
        res.send({
            success : "Failed",
            message : value.error.details[0].message
              })
    }else{
        next()
    }
}

const updateCrudValidation = async (req, res, next) => {
    const value = await Schema.updatereviewCrud.validate(req.body, {abortEarly : true})
    if(value.error){
        res.send({
            success : "Failed",
            message : value.error.details[0].message
        })
    }
    next()
}

module.exports = { reviewCrudValidation, updateCrudValidation}
