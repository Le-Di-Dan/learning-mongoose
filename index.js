require("dotenv").config()
const mongoose = require("mongoose");
const cors = require("cors")
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

app.use(cors())
app.use(bodyParser.json());

const main = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/learn-mongoose");
    console.log("Connect to mongo succeeded.");
    app.listen(process.env.PORT || 3000, () => console.log("start server"));
  } catch (error) {
    console.log(error);
  }
};

routes.forEach((route) => {
  app.use(route.prefix, route.router);
});

main();
