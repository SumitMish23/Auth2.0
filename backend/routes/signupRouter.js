const { Router } = require("express");
const app = Router();

const signup = require("../controllers/signupController.js");
const signin = require("../controllers/signinController.js");
const { validateRefreshToken } = require("../auth/AuthenticationJWT.js");
const {OAuth2Client} = require('google-auth-library');
// Method call and calling controller :
app.post("/sumit", signup);
app.post("/mishra", signin);
app.post("/sureshsudha", (req, res) => {
  return res.status(200).send({
    error: true,
    status: 200,
    message: "SUCCESS !",
  });
});
app.post("/refresh-token", validateRefreshToken);
app.post("/google-authenticate", async function (_,res) {
 
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    `http://localhost:3000/sign-in`
  );
   // Generate the url that will be used for the consent dialog.
   const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  });
  res.send({authorizeUrl});
});
// Exporting :
module.exports = app;
