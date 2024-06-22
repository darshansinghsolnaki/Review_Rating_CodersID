const { count } = require('../model/Company_Schema');
const Company_Schema = require('../model/Company_Schema')
const review_Schema = require('../model/review_Schema')

const createCompany = async (req, res) => {
    try {
    const companydata = new Company_Schema(req.body);
    // console.log(req.body.companyname);
    const companyExists = await Company_Schema.findOne({ companyname : req.body.companyname })
    if (companyExists) {
        return res.status(400).json({
            status : "Exist",
            message : "Company is Alredy Exist"
        });
    }
        const filepath = `/uploads${req.file.filename}`
        companydata.company_logo = filepath
        const addcompany = await companydata.save()
        res.status(200).json({
            status : "Success",
            message : "Company create successfully"
        })
    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : error.message
        })
    }
}


const companylist = async (req, res) => {
    try {
        const listData = await Company_Schema.find().count()
        // const counte = await Company_Schema.count()
        res.status(200).json({
            status : "Success",
            // "Counted" : counte,
            message : listData
        })
    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : error.message
        })
    }
}




const companyReviewDatils = async (req, res) => {
    try {
        let id = req.params.key
        // console.log('api company id', id);
        const company = await Company_Schema.findById(id).lean()
        const comments = await review_Schema.find({ 'companyId': `${id}` }).populate({
            path : 'userID', select : "name profilepic"
        }).populate({
            path : "companyId", select : "_id"
        })
        // var data = {
        //     "company" : company,
        //     "comments" : comments
        //     // console.log('**** coment ', comments)
        // }
        res.status(200).json({
            status : "Success",
            message : "Review Datils in company",
            "company" : company,
            "Comments" : comments
        })
        
    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : error.message
        })
    }
}

module.exports = { createCompany, companylist, companyReviewDatils }
