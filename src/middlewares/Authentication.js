import { decode } from "jsonwebtoken";
import User from "../model/userModel";
import Driver from "../model/driverModel";
import Resp from "../scripts/Responser";
import { isEmpty } from "../scripts/Utility";

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
    const type = socket?.handshake?.query?.token;
    const token = socket?.handshake?.query?.token;
    let decoded = decode(token, process.env.TOKEN_KEY);

    if (isEmpty(type)) return;
    if (isEmpty(decoded)) return;

    if (type === "user") {
      const user = await User.findById(decoded?.id);
      socket.user = user;
      socket.type = "user";
      next();
    } else if (type === "driver") {
      const driver = await Driver.findById(decoded?.id);
      socket.driver = driver;
      socket.type = "driver";
      next();
    } else return;
  } catch (err) {
    console.log("this is from ValidateSocket TryCatch Err", err);
    return;
  }
};

export { Authentication, ValidateSocket };
