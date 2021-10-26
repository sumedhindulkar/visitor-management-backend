const mongoose = require("mongoose");

const visitorDetailSchema = new mongoose.Schema({
  vName: {
    type: String,
    required: true,
  },
  vPhone: {
    type: Number,
    required: true,
  },
  vPhoto: {
    type: String,
  },
  visitAddress: {
    type: String,
    required: true,
  },
  visitReason: {
    type: String,
  },
  visitTime: {
    type: Date,
    default: Date.now,
  },
});

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  floor: {
    type: Number,
    min: 0,
    max: 80,
  },
  wings: {
    type: Number,
    min: 0,
  },
  isBuilding: {
    type: Boolean,
    default: true,
  },
  qrcode: {
    type: String,
  },
  secretary: {
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  visitors: [visitorDetailSchema],
});

buildingSchema.methods.addNewVisitor = function (newVisitor) {
  this.visitors.push(newVisitor);
  return this.save();
};

const Visitor = mongoose.model("Visitor", visitorDetailSchema);
const Building = mongoose.model("Building", buildingSchema);

module.exports = { Building, Visitor };
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
