import express from "express";
import { login, register } from "../controllers/Auth/authentication";
import { Authentication } from "../middlewares/Authentication";
var router = express.Router();

router.post("/drivers/login", login);
router.post("/drivers/register", Authentication, register);

module.exports = router;
