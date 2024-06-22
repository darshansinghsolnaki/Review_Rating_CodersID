const server = require('../index')
const chaiHttp = require("chai-http")
const chai = require('chai')
const utils = require('../model/User_Schema')
const router = require('../routes/userRoutes')

chai.should();
chai.use(chaiHttp)

describe("Task API", () => {

    describe("User Login API", () => {
        it("If user provided valid data return login success message :", (done) => {
            const data = {
                email : "rinkesh998@gmail.com",
                password : "abcd123"
            };
            chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("status").eq("success");
                res.body.should.have.property("message").eq("User login Successful");
                res.body.should.have.property("token")
                done();
            })
        }),
        it("If user password is not valid return invalid data ", (done) => {
            const data = {
                email : "rinkesh998@gmail.com",
                password : "abcd13"
            };
            chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end( (err, res) => {
                res.should.have.status(404);
                res.should.be.a("object");
                res.body.should.have.property("status").eq("Failed")
                res.body.should.have.property("message").eq("User Password in not valid");
                done()
            })
        }),
        it("If not a registered user provided return invalid me", (done) => {
            const data = {
                email : "rinssddssds@gmail.com",
                password : "abcd13",
            };
            chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end( (err, res) => {
                res.should.have.status(550);
                res.should.be.a("object");
                res.body.should.have.property("status").eq("Failed")
                res.body.should.have.property("message").eq("you are not rigester user")
                done()
            })
        })
    })
})