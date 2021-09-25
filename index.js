const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const buildingRoutes = require("./routes/buildingRoutes");
mongoose
  .connect("mongodb://localhost:27017/visitorManagement", {
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

app.use("/api", buildingRoutes);

app.listen(port, () => {
  console.log(`Backend Started at port: ${port}`);
});
