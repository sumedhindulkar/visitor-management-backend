const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.get("/users", async (req, res) => {
  const data = await User.find({}).catch((err) => console.log("Error: ", err));
  res.json(data);
});

// Addusers to database
router.post("/users", async (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);
  await newUser.save((err) => {
    if (err) {
      console.log(err);
    }
    res.json({
      msg: "Data Saved",
    });
  });
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id).catch((err) =>
    console.log("Error: ", err)
  );
  res.json(data);
});

module.exports = router;
