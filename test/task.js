const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../index')
chai.should();
chai.should(chaiHttp);

describe("Task API", () => {
    describe("GET/api/tasks", () => {
        it("it should get all the task", (done) => {
            chai
                .request(server)
                .post("test/api/task")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eq(3);
                    done()
                })
        })
    })
})