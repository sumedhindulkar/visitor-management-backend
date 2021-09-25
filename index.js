const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

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

// buildData.save().then(data => console.log(data))
app.get("/", (req, res) => {
  res.send("This is backend");
});

app.listen(port, () => {
  console.log(`Backend Started at port: ${port}`);
});
