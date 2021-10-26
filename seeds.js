require("dotenv").config();
const { Building, Visitor } = require("./models/building");
const { User } = require("./models/user");
const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.MONGOURI || "mongodb://localhost:27017/visitorManagement",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Connection Error: " + err));

// const newVisitor = new Visitor({
//   vName: "Sahsha",
//   vPhone: "9998887775",
// });

// const buildData = new Building({
//   name: "vishwas",
//   visitors: [newVisitor],
// });

// const addDummyData = async () => {
//   const foundBuilding = await Building.findOne({ name: "vishwas" }).catch(
//     (err) => console.log("Ohh no error: " + err)
//   );
//   await foundBuilding.addNewVisitor(newVisitor);
//   console.log(foundBuilding);
// };
// addDummyData();
const checkLogin = async () => {
  // const foundUser = await User.findOne({
  //   name: "shubham@gmail.com",
  // }).catch((err) => console.log("Ohh no error: " + err));
  // const foundUser = await User.findById("61716053c6319e081a8fa2d8").catch(
  //   (err) => console.log("Ohh no error: " + err)
  // );
  const foundUser = await User.findOne({ email: "sumedh@gmail.com" }).catch(
    (err) => console.log("Ohh no error: " + err)
  );
  console.log(foundUser);
};
checkLogin();
// const addDummyData = async () => {
//   const foundBuilding = await Building.findOne({ name: "vishwas" }).catch(
//     (err) => console.log("Ohh no error: " + err)
//   );
//   await foundBuilding.addNewVisitor(newVisitor);
//   console.log(foundBuilding);
// };
// addDummyData();

// newVisitor.save().then((data) => {
// buildData.save().then((data) => console.log(data));
// });
