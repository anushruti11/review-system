require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const db_url = process.env.MONGO_URL;
const port = process.env.PORT;

mongoose
  .connect(`${db_url}`)
  .then(() => {
    console.log("Connected to Database at", db_url);
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

app.listen(port, () => {
  console.log("Listening on port", port);
});
