const express = require("express");
//const cors = require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// CRITICAL FIX: Define the connection URL using the correct Docker service name and database name
// This bypasses the buggy db.url variable and fixes the 'localhost' error.
const MONGO_CONNECTION_URL = "mongodb://mongo:27017/dd_db"; 

db.mongoose
  .connect(MONGO_CONNECTION_URL, { // Use the fixed URL
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    // CRITICAL FIX: COMMENT OUT process.exit() to prevent the server from crashing
    // when MongoDB is temporarily unavailable (which happens on startup).
    // process.exit(); 
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});