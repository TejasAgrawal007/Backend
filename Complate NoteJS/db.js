const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 1. Connection
const db = mongoose.connection;

//2. Listerners
db.on("connected", () => {
  console.log("Connected to MongoDB Server!");
});

db.on("error", (err) => {
  console.log("MongoDB connection Error!", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Disconnected!");
});

// 3. Export The Database Connection
module.exports = db;
