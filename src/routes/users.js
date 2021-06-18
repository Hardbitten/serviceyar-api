import express from "express";
import { login, register } from "../controllers/Auth/authentication";
import { Authentication } from "../middlewares/Authentication";
var router = express.Router();

router.post("/users/login", login);
router.post("/users/register", Authentication, register);

module.exports = router;
