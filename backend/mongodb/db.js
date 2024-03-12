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

module.exports = { createUser };
