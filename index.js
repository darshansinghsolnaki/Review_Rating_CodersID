const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
require('./model/config')
const bodyParser = require("body-parser")
const router = require('./routes/commanRoutes')
app.use(bodyParser.json());
const testRouter = require('./validaion')

app.use('/',router)
app.use('/test', testRouter)

const server = app.listen((process.env.PORT), (req, res) => {
    console.log(`server running : ${process.env.PORT}`);
});

module.exports = server;