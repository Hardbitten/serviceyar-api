import User from "../../model/userModel";
import jwt from "jsonwebtoken";
import responser from "../../scripts/Responser";
const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.TOKEN_KEY
  );
};
export const login = async (req, res, next) => {
  let token;
  // Create User
  try {
    const user = await User.findOne({
      mobileNumber: req.body.mobileNumber,
    });
    if (!user) {
      const newUser = await User.create(req.body);
      token = signToken(newUser._id);
      responser.bind(res)({
        statusCode: 201,
        data: {
          token,
          isRegistred: false,
          user: newUser,
        },
        devMsg: "success",
      });
    } else {
      token = signToken(user._id);
      responser.bind(res)({
        statusCode: 201,
        data: {
          isRegistred: true,
          token,
          user,
        },
        devMsg: "success",
      });
    }
  } catch (err) {
    console.log("THIS IS FROM LOGIN HANDDLER", err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.updateOne(
      { _id: req.userId },
      { firstName, lastName },
      {
        new: true,
        runValidator: true,
        useFindAndModify: true,
      }
    );
    responser.bind(res)({
      statusCode: 201,
      data: {
        user,
      },
      devMsg: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
