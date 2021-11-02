require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const buildingRoutes = require("./routes/buildingRoutes");
const userRoutes = require("./routes/userRoutes");
// const generateToken = require("./utils/generateToken");
// const { User } = require("./models/user");
// const bcrypt = require("bcryptjs");
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Error in database connection!!!");
  });
// console.log(generateToken("sumedh"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", buildingRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Backend Started at port: ${port}`);
});
