import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        lowercase: true,
        required: [true, "لطفا نام کاربری خود را وارد کنید"]
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'لطفا ایمیل خود را به درستی وارد نمایید']
    },
    number: {
        type: Number,
        required: [true, "شماره همراه خود را وارد نمایید"]
    },
    driver : {
        type: mongoose.Schema.ObjectId , 
        ref: "Driver" , 
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'guest' ,'admin'],
        default: 'guest'
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

const User = mongoose.model("User" , userSchema);

export default User;