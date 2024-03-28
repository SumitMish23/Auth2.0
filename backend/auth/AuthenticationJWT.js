const jwt = require("jsonwebtoken");
const authenticateJwtToken = (req, res, next) => {
  if (req.method === 'POST' && req.path !== '/mishra') {
        const token =
        req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
            if (err) return res.status(401).send("User Auauthorized !");
            next();
          });
    }else{
        next();
    };
  
};
module.exports = authenticateJwtToken;
