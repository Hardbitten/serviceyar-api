import express from "express";
import { login } from "../controllers/Auth/authentication";
var router = express.Router();

router.post("/user/login", login);
router.put("/user/register", Authentication, register);

module.exports = router;
