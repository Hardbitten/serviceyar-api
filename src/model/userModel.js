import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    //required: [true, "لطفا نام خود را وارد کنید"],
  },
  lastName: {
    type: String,
    lowercase: true,
    //required: [true, "لطفا نام خانوادگی خود را وارد کنید"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "شماره همراه خود را وارد نمایید"],
  },
  driverId: {
    type: mongoose.Schema.ObjectId,
    ref: "Driver",
    default: null,
    //required: true
  },
  role: {
    type: String,
    enum: ["user", "guest", "admin"],
    default: "guest",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
