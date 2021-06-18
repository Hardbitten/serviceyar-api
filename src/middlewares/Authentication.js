import {
  decode
} from "jsonwebtoken";
import User from "../model/userModel"
import Resp from "../scripts/Responser";
import {
  log
} from "../scripts/loger";
const Authentication = async (req, res, next) => {
  if (req.headers["authorization"] !== undefined) {
    /* decode Token And Get User [id] */
    const token = req.headers.authorization.split(" ")[1];
    let Token = decode(token, process.env.TOKEN_KEY);
    if (Token) {
      // Validate User Here //
      const userData = await User.findById(Token.id);
      if (userData) {
        req.userId = userData._id;
        next();
      } else {
        return Resp.bind(res.status(401))({
          status: false,
          devMsg: "token not valid!",
          message: "هویت نامعتبر است، لطفا مجدد وارد شوید",
        });
      }
    } else
      return Resp.bind(res.status(401))({
        status: false,
        devMsg: "token not valid!",
        message: "هویت نامعتبر است، لطفا مجدد وارد شوید",
      });
  } else
    return Resp.bind(res)({
      status: false,
      devMsg: "token not found!",
      message: "هویت نامعتبر است، لطفا مجدد وارد شوید",
    });
};

const ValidateSocket = async (socket, next) => {
  try {
    const token = socket?.handshake?.query?.token;
    let decoded = decode(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);
    socket.user = user._doc;
    next();
  } catch (err) {
    console.log("this is from ValidateSocket TryCatch Err" , err);
    return ;
  }
}

export {
  Authentication,
  ValidateSocket
};