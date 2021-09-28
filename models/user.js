const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model("user", usersSchema);

module.exports = { User };
// const buildData = new Building({
//   name: "sangeeta",
//   floor: 14,
//   qrcode: "xyz",
//   visitors: [newVisitor],
// });

// const newVisitor = new Visitor({
//   Vname: "kate",
//   VPhoneNumber: "9998887775",
//   visitTime: "default",
// });
