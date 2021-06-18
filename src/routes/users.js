import express from "express";
import { login, register } from "../controllers/Auth/userAuthentication";
import { userAuthentication } from "../middlewares/Authentication";
var router = express.Router();

router.post("/login", login);
router.post("/register", userAuthentication, register);

module.exports = router;
