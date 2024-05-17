const { connect, getDb } = require("../mongodb/connectDB");

/*  Get Value from the DB */
async function checkIfValueExists(
  collectionName,
  fieldName,
  fieldValue,
  valueToBeReturned = ""
) {
  try {
    const connectionStatus = await connect();
    if (connectionStatus == 200) {
      const db = getDb();
      const value = await db
        .collection(collectionName)
        .find({ [fieldName]: fieldValue });
      const document = await value.toArray();
      if (document) {
        if (valueToBeReturned) {
          return document[0][valueToBeReturned]
            ? document[0][valueToBeReturned]
            : null;
        } else {
          return document[0][fieldName]; // Return the value of the specified field
        }
      } else {
        return null; // Field value not found
      }
    }
  } catch (e) {
    return e;
  }
}

async function addFieldToDocument(
  collectionName,
  query,
  fieldName,
  fieldValue
) {
  try {
    const connectionStatus = await connect();
    if (connectionStatus == 200) {
      const db = getDb();
      const result = await db
        .collection(collectionName)
        .updateOne(query, { $set: { [fieldName]: fieldValue } });
      return {status: 200, message: "Field Added" };
      }
  } catch (error) {
    console.error("Error adding field to document:", error);
    throw error;
  }
}

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

module.exports = {
  createUser,
  loginUser,
  addFieldToDocument,
  checkIfValueExists,
};
