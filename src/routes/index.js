import express from "express";
import { login, register } from "../controllers/Auth/authentication";
import { Authentication } from "../middlewares/Authentication";
var router = express.Router();

router.post("/user/login", login);
router.put("/user/register", Authentication, register);

module.exports = router;
