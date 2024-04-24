const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LoginSignUp")
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });
  const billingAddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
});


const paymentInfoSchema = new mongoose.Schema({
    cardName: {
        type: String,
        required: true,
    },
    cardNum: {
        type: String,
        required: true,
    },
    expMonth: {
        type: String,
        required: true,
    },
    expYear: {
        type: Number,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    },
});


const paymentSchema = new mongoose.Schema({
    billingAddress: billingAddressSchema,
    paymentInfo: paymentInfoSchema,
});


const collection3 = mongoose.model('Payment', paymentSchema);


  module.exports = collection3;