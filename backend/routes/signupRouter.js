const { Router } = require("express");
const app = Router();

const signup = require("../controllers/signupController.js");
const signin = require("../controllers/signinController.js");
const {validateRefreshToken} = require("../auth/AuthenticationJWT.js");

// Method call and calling controller :
app.post("/sumit", signup);
app.post("/mishra", signin);
app.post("/sureshsudha",(req,res)=>{
    return res.status(200).send({
        error: true,
        status: 200,
        message: "SUCCESS !",
      });
});
app.post("/refresh-token",validateRefreshToken);

// Exporting :
module.exports = app;
