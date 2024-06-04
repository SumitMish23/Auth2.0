const jwt = require("jsonwebtoken");
const { addFieldToDocument, checkIfValueExists } = require("../mongodb/db");
const generateAccessToken = async (user) => {
  if (!user) return null;
  const userId = await checkIfValueExists("signup", "email", user.email, "_id");
  if (!userId) return;
  console.log("creating tokenwa", userId.toString());
  return jwt.sign(
    { userId: userId.toString() },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "15s",
    }
  );
};
const generateRefreshAccessToken = async (user) => {
  const userId = await checkIfValueExists("signup", "email", user.email, "_id");
  // if (!user) return null;
  console.log(user, "INSIDE");
  const refreshToken = jwt.sign(
    { userId: userId.toString() },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  const tokenUpdated = await addFieldToDocument(
    "signup",
    { email: user.email },
    "refreshToken",
    refreshToken
  );
  console.log({'status':tokenUpdated})
  if (tokenUpdated.status == 200) {
    return refreshToken;
  }
};
const authenticateJwtToken = (req, res, next) => {
  if (
    req.method === "POST" &&
    !['/google-authenticate',"/refresh-token" ,'/mishra'].includes(req.path)
   ) {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      console.log(err);
      if (err) return res.status(401).send({status:400,message:"User Unauthorized !"});
      next();
    });
  } else {
    next();
  }
};

const validateRefreshToken = async (req, res) => {
  
  /* Check that if refresh token exists or not in the DB */
  const incomingRefreshToken = req.body?.refresh_token;
  const isTokenExists = await checkIfValueExists(
    "signup",
    "refreshToken",
    incomingRefreshToken
  );
  if (!incomingRefreshToken)
    return res.status(403).send("Refresh token is required");
  if (!isTokenExists) return res.status(403).send("Token doesnt exists");
  if (isTokenExists) {
    jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, user) => {
        if (err) return res.status(401).send(err);
        const newAccessToken = await generateAccessToken(user);
        res.status(200).send({ accessToken: newAccessToken });
      }
    );
  } else {
  }
};
module.exports = {
  authenticateJwtToken,
  generateAccessToken,
  generateRefreshAccessToken,
  validateRefreshToken,
};
