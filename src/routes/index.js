import express from "express";
import {signup} from "../controllers/Auth/authentication"
var router = express.Router();

router.post("/user/register" , signup)

router.get("/", (req, res, next) => {
  return Response.bind(res)();
});

module.exports = router;
