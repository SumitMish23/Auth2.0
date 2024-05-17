const { createUser } = require("../mongodb/db");
const Validator = require("validatorjs");
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};
module.exports = (req, res) => {
  const validationRule = {
    email: "required|string|email",
    username: "required|string|min:3|max:25",
    password: "required|string|min:5|confirmed",
    password_confirmation: "required|string|min:6",
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
      createUser(req.body).then((data) => {
        if (data) {
          res.status(200).send({
            success: true,
            status: 200,
            message: data,
          });
        }
      });
    }
  });
};
