const express = require("express");
const router = express.Router();

const { getDB } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single contact by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Make sure all fields are present
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = await db.collection("contacts").insertOne(contact);

    res.status(201).json({
      id: result.insertedId
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// PUT update contact by ID
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.collection("contacts").replaceOne(
      { _id: new ObjectId(req.params.id) },
      contact
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;