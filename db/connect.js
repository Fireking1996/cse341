const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  await client.connect();
  db = client.db("cse341"); // explicitly set DB name
  console.log("Connected to MongoDB");
  return db;
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };