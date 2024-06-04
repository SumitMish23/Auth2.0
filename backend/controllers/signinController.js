require("dotenv").config();
const { loginUser } = require("../mongodb/db");
const {
  generateAccessToken,
  generateRefreshAccessToken,
} = require("../auth/AuthenticationJWT");

const signIn = (req, res) => {
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
      console.log('isnide------------------------')
      loginUser(req.body).then(async (data) => {
        console.log(data, "login data");
        if (data.status === 200) {
          const accessToken = await generateAccessToken(req.body);
          const refreshToken = await generateRefreshAccessToken(req.body);
        
          if (!refreshToken || !accessToken)
            data.message = "Token Invalidation";
          res.status(200).send({
            success: true,
            status: data.status,
            message: data.message,
            accessToken,
            refreshToken,
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
