const { MongoClient, ServerApiVersion } = require("mongodb");
const url =
  "mongodb+srv://sumit894sumit:xtX7lwuJwJlfxtN1@sumitcluster.tqagy9b.mongodb.net/?retryWrites=true&w=majority&appName=SumitCluster";
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let db;
async function connect() {
  try {
    await client.connect();
    db = client.db("authentication");
    if(db) return 200;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    if(error) return 400;
    
  }
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };
