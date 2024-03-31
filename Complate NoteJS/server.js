const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const port = 3000;

// Models
const Person = require("./models/Person");
const menuItem = require("./models/menuItem");

// Middleware
app.use(bodyParser.json()); // req.body

// Person Routes
app.post("/Person", async (req, res) => {
  try {
    // Assuming the request body contain the person data
    const data = req.body;

    // Create a New Person document using mongoose model
    const newPerson = new Person(data);

    // Save to The Person
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

// Person Routes Get method
app.get("/Person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Featched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

// menuItem Routes
app.post("/menuItem", async (req, res) => {
  try {
    // Assuming the request body contain the person data
    const data = req.body;

    // Create a New Person document using mongoose model
    const newItem = new menuItem(data);

    // Save to The Person
    const response = await newItem.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

// menuItem Routes Get method
app.get("/menuItem", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("Data Featched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Hotels!... How May I Help You!");
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
