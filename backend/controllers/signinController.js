require("dotenv").config();
const { loginUser } = require("../mongodb/db");

const jwt = require("jsonwebtoken");
const signIn = (req, res) => {
  console.log(req.headers)
  const Validator = require("validatorjs");
  const validationRule = {
    email: "required|string|email",
    password: "required|string|min:5",
  };
  const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.setHeader("Content-Type", "application/json");
      res.status(412).send({
        error: true,
        status: 400,
        message: "Validation failed",
      });
    } else {
      const accessToken = jwt.sign(
        req.body?.email?.split("@")[0],
        process.env.ACCESS_TOKEN_SECRET_KEY
      );
      loginUser(req.body).then((data) => {
        console.log(data);
        if (data.status === 200) {
          res.status(200).send({
            success: true,
            status: data.status,
            message: data.message,
            accessToken
          });
        } else {
          res.status(data.status).send({
            success: false,
            message: data.message,
          });
        }
      });
    }
  });
};
module.exports = signIn;
