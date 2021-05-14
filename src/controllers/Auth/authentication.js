import User from "../../model/userModel"
import jwt from "jsonwebtoken"
import responser from "../../scripts/Responser"

const signToken = id => {
    return jwt.sign({
        id
    }, process.env.TOKEN_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

export const signup = async (req, res, next) => {
    console.log(req.body);
    // Create User
    const newUser = await User.create(req.body);

    // Create jwt 
    const token = signToken(newUser._id);
    responser.bind(res)({
        statusCode: 201,
        data: {
          token
        },
        devMsg : "success" , 
      });
}


