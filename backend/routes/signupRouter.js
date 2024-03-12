const { Router } = require('express'); 
const app = Router(); 
const signup=require("../controllers/signupController.js");
const { createUser } = require('../mongodb/db.js'); 


// method call and calling controller :

app.post("/sumit", signup); 

// exporting :
module.exports = app;