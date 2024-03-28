const { Router } = require("express");
const app = Router();

const signup = require("../controllers/signupController.js");
const signin = require("../controllers/signinController.js");

// Method call and calling controller :

app.post("/sumit", signup);
app.post("/mishra", signin);

// Exporting :
module.exports = app;
