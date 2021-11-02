const express = require("express");
const router = express.Router();
const { Building } = require("../models/building");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add new building
// router.post("/building", async (req, res) => {
//   const data = req.body;
//   const newBuilding = new Building(data);
//   newBuilding.save((err) => {
//     if (err) {
//       console.log(err);
//     }
//     res.json({
//       msg: "Data Saved",
//     });
//   });
// });

// Register a Building and add them to database
router.post("/building", async (req, res) => {
  const userData = req.body;
  const { email, name, password, photo, phone } = userData;
  // if (!name || !password || !photo || !email || !phone) {
  //   return res.status(400).json({ msg: "Please enter all fields" });
  // }
  const userExist = await Building.findOne({ email });
  if (userExist) {
    return res.json({ msg: "User Already Exist" });
  }

  const newBuilding = new Building({ name, email, password, photo, phone });

  // Create salt and hash

  const salt = await bcrypt.genSalt(10);
  newBuilding.password = await bcrypt.hash(newBuilding.password, salt);
  try {
    await newBuilding.save((err) => {
      // if (err) {
      //   res.status(400).json({ msg: `Error baby: ${err}` });
      // }
      const id = newBuilding.id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET);

      res.json({
        user: {
          id: newBuilding.id,
          name: newBuilding.name,
          email: newBuilding.email,
          isBuilding: newBuilding.isBuilding,
        },
        token,
      });
    });
  } catch (err) {
    console.log("some err" + err);
  }
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
  res.json({
    msg: "Data Saved",
  });
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
