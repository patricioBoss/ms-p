import { default as express } from "express";
import User from "../model/user.mjs";
import errorHandler from "../helpers/dbErrorHandler.mjs";

export const router = express.Router();


router.post("/", function (req, res) {
  console.log("this is the body", req.body);

  const user = new User(req.body);
  console.log("this is the body", user);
  user.save(function (err) {
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
