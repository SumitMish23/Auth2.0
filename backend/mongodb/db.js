const { connect, getDb } = require("../mongodb/connectDB");
async function createUser(data) {
  try {
    const connectionStatus = await connect();
    if (connectionStatus == 200) {
      const db = getDb();
      const isUserExist = await db
        .collection("signup")
        .findOne({ email: data.email });
      if (isUserExist) {
        return "User Already Registered !";
      } else {
        await db.collection("signup").insertOne(data);
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function loginUser(data) {
  try {
    const connectionStatus = await connect();
    if (connectionStatus === 200) {
      const db = getDb();
      const isUserExist = await db
        .collection("signup")
        .findOne({ email: data.email });
      if (isUserExist) {
        const fetchPassword = (await isUserExist.password) === data.password;
        if (fetchPassword) {
          return { status: 200, message: "Login successful !" };
        } else {
          return {
            status: 401,
            message: "Incorrect password. Please try again.",
          };
        }
      } else {
        return {
          status: 404,
          message: "Email is not registered. Please sign up.",
        };
      }
    }
  } catch (error) {
    console.error("Error while loging :", error);
    throw error;
  }
}

module.exports = { createUser, loginUser };
