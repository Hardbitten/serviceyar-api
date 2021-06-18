import jwt from "jsonwebtoken";
import responser from "../../scripts/Responser";
import Driver from "../../model/driverModel";
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
  // Create Driver
  try {
    const driver = await Driver.findOne({
      mobileNumber: req.body.mobileNumber,
    });
    if (!driver) {
      const newDriver = await Driver.create(req.body);
      token = signToken(newDriver._id);
      responser.bind(res)({
        statusCode: 201,
        data: {
          token,
          isRegistred: false,
          driver: newDriver,
        },
        devMsg: "success",
      });
    } else {
      token = signToken(driver._id);
      responser.bind(res)({
        statusCode: 201,
        data: {
          isRegistred: true,
          token,
          driver,
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
    const driver = await Driver.updateOne(
      { _id: req.driverId },
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
        driver,
      },
      devMsg: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
