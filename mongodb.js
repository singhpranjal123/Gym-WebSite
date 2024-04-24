const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LoginSignUp")
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const loginschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

const collection = new mongoose.model("Collection1", loginschema);

module.exports = collection;
