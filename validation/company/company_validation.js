const company = require('./company_schema')
// const review = require('./company_schema')/

module.exports = {
    registercompanyvalidation: async (req, res, next) => {
        const value = await company.registercompany.validate(req.body, { abortEarly: true }) // Error show for abortEarly but true then show all Error 
        if (value.error) {
            res.json({
                success: "Failed",
                message: value.error.details[0].message
            })
        } else {
            next()
            //next is liye sab sahi ho to agle 
        }
    },

    registerreviewvalidation: async (req, res, next) => {
        const value = await company.addreview.validate(req.body, { abortEarly: true })
        if (value.error) {
            res.json({
                success: "Failed",
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}