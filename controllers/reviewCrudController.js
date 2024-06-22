const review_Schema = require('../model/review_Schema')

const addreview = async (req, res) => {
    try {
    const reviewData = new review_Schema(req.body)
    console.log(req.body);
        const addreview = await reviewData.save()
        res.status(200).json({
            status : "Success",
            message : "Add review successfully"
        })
    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : error.message
        })
    }
}
const reviewlist = async (req, res) => {
    try {
        const listData = await review_Schema.find()
        const counte = await review_Schema.count()
        res.status(200).json({
            status : "Success",
            "Counted" : counte,
            "listData" : listData
        })
    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : error.message
        })
    }
}

const updateReview = async (req, res) => {
    try {
        const updateResult = await review_Schema.findByIdAndUpdate(req.params.id, req.body)
        rex.status(200).json({
            status : "Success",
            message : "Update data successfully",
            // "UpdateResult" : updateResult
        })
    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : error.message
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        const deleteResult = await review_Schema.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status : "Success",
            message : "Delete  data successfully "
        })
    } catch (error) {
        res.status(500).json({
            status : "Error",
            message : error.message
        })
    }
}


module.exports = { addreview, updateReview, deleteReview, reviewlist }
