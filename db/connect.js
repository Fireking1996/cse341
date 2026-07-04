const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(); // uses database from URI
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized yet");
  }
  return db;
}

module.exports = { connectDB, getDB };