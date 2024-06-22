const express = require('express')
const router  = express.Router()
const userRouter = require('./userRoutes')
const companyRouter = require('./companyRoutes')
const reviewCrudRouter = require('./reviewCrudRouter')

router.use('/user', userRouter )
router.use('/company', companyRouter)
 router.use('/reviewcrud', reviewCrudRouter )

module.exports = router;
