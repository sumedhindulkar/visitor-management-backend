const { Building, Visitor } = require("./models/building");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/visitorManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Connection Error: " + err));

const newVisitor = new Visitor({
  vName: "Sahsha",
  vPhone: "9998887775",
});

// const buildData = new Building({
//   name: "vishwas",
//   visitors: [newVisitor],
// });

const addDummyData = async () => {
  const foundBuilding = await Building.findOne({ name: "vishwas" }).catch(
    (err) => console.log("Ohh no error: " + err)
  );
  await foundBuilding.addNewVisitor(newVisitor);
  console.log(foundBuilding);
};
addDummyData();

// newVisitor.save().then((data) => {
// buildData.save().then((data) => console.log(data));
// });
