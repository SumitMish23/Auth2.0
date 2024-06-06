const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const cors = require("cors");
const path = require("path");
const rootPath = path.join(__dirname, "../");
const home = require("./routes/signupRouter");
const {authenticateJwtToken}= require("./auth/AuthenticationJWT");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


/* Apply the middleware to all routes for JWT  : */
app.use(authenticateJwtToken);

/* Routers : */
app.use(home);
app.use(express.static(path.join(rootPath, "frontend/public")));
app.use(express.static(path.join(rootPath, "frontend/src")));
app.use(express.static(path.join(rootPath, "frontend/x/build")));
app.get('/chaitri',(_,res)=>{
  res.sendFile(path.join(rootPath,"frontend/x/build","index.html"))
});
app.get(["/","/sign-in"], (_, res) => {
  res.sendFile(path.join(rootPath, "frontend/public", "index.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
