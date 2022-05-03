const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const mongoDB = process.env.MONGO_URI;

mongoose
  .connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(port, console.log(`Server is now running at port: ${port}`));
