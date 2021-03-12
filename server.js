const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3004;
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require("./routes/routes");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('DB connected'));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use('/app', routeUrls);

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
