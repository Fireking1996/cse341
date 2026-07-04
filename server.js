const express = require("express");
require("dotenv").config();

const { connectDB } = require("./db/connect");
const contactsRoute = require("./routes/contacts");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is working");
});

async function startServer() {
  await connectDB();

  // ONLY attach routes AFTER DB is ready
  app.use("/contacts", contactsRoute);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();