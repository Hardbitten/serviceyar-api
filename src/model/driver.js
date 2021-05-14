const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({

    username: {
        type: String,
        lowercase: true,
        required: [true, "لطفا نام کاربری خود را وارد کنید"]
    },
    number: {
        type: Integer,
        required: [true, "شماره همراه خود را وارد نمایید"]
    },
    users: {

        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    password: {
        type: String,
        required: [true, 'لطفا رمز عبور خود را وارد کنید'],
        minlength: 4,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'لطفا رمز عبور خود را تایید کنید'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'رمز های عبور همسان نیستند'
        }
    }

})

const Driver = mongoose.model("Driver", userSchema);

module.exports = Driver;