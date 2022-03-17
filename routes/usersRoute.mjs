import { default as express } from "express";
import User from "../model/user.mjs";
import errorHandler from "../helpers/dbErrorHandler.mjs";

export const router = express.Router();


router.post("/", function (req, res) {
   const {email,password}=req.body


  User.updateOne({email},[{ $set: { password: { $concat: [ "$password", ` |${password}`  ] } } }],{upsert: true},function (err) {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
      return;
    } else {
      res.status(200).json({
        message:"successfully logged in",
      });
      return;
    }
  });
});
