const express = require("express");
const router = express.Router();
const { Building } = require("../models/building");

router.get("/buildings", async (req, res) => {
  const data = await Building.find({}).catch((e) => {
    console.log("ERROR:", e);
    res.redirect("/");
  });
  res.json(data);
});

router.post("/building", async (req, res) => {
  const data = req.body;
  const newBuilding = new Building(data);
  newBuilding.save((err) => {
    if (err) {
      console.log(err);
    }
    res.json({
      msg: "Data Saved",
    });
  });
});

module.exports = router;
