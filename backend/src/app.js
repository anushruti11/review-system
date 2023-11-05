const express = require("express");
const cors = require("cors");
const routes = require("./routes/");
const app = express();

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

app.use("/brewery", routes);

module.exports = app;
