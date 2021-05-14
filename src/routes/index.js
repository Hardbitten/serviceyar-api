import express from "express";
import {login} from "../controllers/Auth/authentication"
var router = express.Router();

router.post("/user/register" , login)

router.get("/", (req, res, next) => {
  return Response.bind(res)();
});

module.exports = router;
