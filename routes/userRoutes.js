require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
router.get("/users", async (req, res) => {
  const data = await User.find({}).catch((err) => console.log("Error: ", err));
  res.json(data);
});

// Register a user and add them to database
router.post("/users", async (req, res) => {
  const userData = req.body;
  const { email, name, password, photo, phone } = userData;
  // if (!name || !password || !photo || !email || !phone) {
  //   return res.status(400).json({ msg: "Please enter all fields" });
  // }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ msg: "User Already Exist" });
  }

  const newUser = new User({ name, email, password, photo, phone });

  // Create salt and hash

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  try {
    await newUser.save((err) => {
      // if (err) {
      //   res.status(400).json({ msg: `Error baby: ${err}` });
      // }
      const id = newUser.id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET);

      res.json({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      });
    });
  } catch (err) {
    console.log("some err" + err);
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id).catch((err) =>
    console.log("Error: ", err)
  );
  res.json(data);
});

module.exports = router;
