require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const buildingRoutes = require("./routes/buildingRoutes");
const userRoutes = require("./routes/userRoutes");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { email, name } = req.body;
  console.log(email, name);
  // return res.json({
  //   success: true,
  //   redirectUrl: "/signup",
  // });
  res.redirect("/signup");
});
app.use("/api", buildingRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Backend Started at port: ${port}`);
});
