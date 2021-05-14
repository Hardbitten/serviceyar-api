import User from "../../model/userModel"
import jwt from "jsonwebtoken"
import responser from "../../scripts/Responser"
 const signToken = id => {
    return jwt.sign({
        id
    }, process.env.TOKEN_KEY)
}
export const login = async (req, res, next) => {
    let token;
    console.log(req.body);
    // Create User
    try {
        
        const user = await User.findOne({
            number: req.body.number
        })
        if (!user) {
            const newUser = await User.create(req.body);
            token = signToken(newUser._id);
            responser.bind(res)({
                statusCode: 201,
                data: {
                    token,
                    user: newUser
                },
                devMsg: "success",
            });
        } else {
            token = signToken(user._id)
            responser.bind(res)({
                statusCode: 201,
                data: {
                    token,
                    user,
    
                },
                devMsg: "success",
            });
    
        }

    } catch (err) {
        console.log(err);
    }    




    // Create jwt 
    // const token = signToken(newUser._id);
    // responser.bind(res)({
    //     statusCode: 201,
    //     data: {
    //       token
    //     },
    //     devMsg : "success" , 
    //   });
}