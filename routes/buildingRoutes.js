const express = require("express");
const router = express.Router();
const { Building } = require("../models/building");

// Add new building
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

// Add visitors to a building
router.post("/building/:id/visitor", async (req, res) => {
  const { id } = req.params;
  const newVisitor = req.body;
  const foundBuilding = await Building.findById(id).catch((err) => {
    console.log("Ohh no error: " + err);
    res.json({ msg: "data saved sucessfully" });
  });
  await foundBuilding.addNewVisitor(newVisitor);
});

// get all buildings
router.get("/buildings", async (req, res) => {
  const data = await Building.find({}).catch((e) => {
    console.log("ERROR:", e);
    res.redirect("/");
  });
  res.json(data);
});

// find a building using an id
router.get("/building/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Building.findById(id).catch((e) => {
    console.log("ERROR:", e);
    res.redirect("/");
  });
  res.json(data);
});
module.exports = router;
