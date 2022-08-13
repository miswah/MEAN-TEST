const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = 5000;

/**Routes Imports */
const UserRoutes = require("./routes/users");

/**Database connection attempet */
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Cluster0",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Check server Health
app.get("/ping", (req, res) => {
  console.log("client request");
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.use("/user", UserRoutes);

app.listen(PORT, () => {
  console.log("Server started listening on PORT : " + PORT);
});
