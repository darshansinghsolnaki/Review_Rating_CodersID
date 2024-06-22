const express = require('express')
const router = express.Router()
const reviewValidation = require('../validation/reviewCrud/reviewCrudValidation')
const reviewcontroller = require('../controllers/reviewCrudController')

 router.post('/addreview', reviewValidation.reviewCrudValidation, reviewcontroller.addreview )
 router.get("/list", reviewcontroller.reviewlist)
router.patch('/update/:id',reviewValidation.updateCrudValidation, reviewcontroller.updateReview)
router.delete("/delete/:id", reviewcontroller.deleteReview)

module.exports = router
