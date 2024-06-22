const mongoose = require('mongoose');

const User_Schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique : true
    },
    number: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        reuqire: true
    },
    state: {
        type: String,
        require: true

    },
    iS_Active: {
        type: Boolean,
        default: true
    },
    profilepic : String,
    role: {
        type: String,
        default: "user"
    }

})

// this line making updated and created feilds autotamicaly
User_Schema.set("timestamps", true)


module.exports = mongoose.model('users', User_Schema)
