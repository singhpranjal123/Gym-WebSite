const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LoginSignUp")
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });
const contactschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

const contact = new mongoose.model("contact", contactschema);

module.exports = contact;
