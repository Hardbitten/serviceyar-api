import express from "express";
import { login, register } from "../controllers/Auth/driverAuthentication";
import { driverAuthentication } from "../middlewares/Authentication";
var router = express.Router();

router.post("/login", login);
router.post("/register", driverAuthentication, register);

module.exports = router;
