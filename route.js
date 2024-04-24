const express = require("express");
const path = require("path");
const app = express();
const collection = require("./mongodb");
const contact = require("./contactdb");
const payment = require("./paymentdb");
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const router = express.Router();

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
router.use(express.static(__dirname + "/public/"));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/" + "views" + "/index.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/" + "views" + "/login.html"));
});
router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.send("yes");
});
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/" + "views" + "/membership.html"));
});

router.get("/payment",(req,res)=>{
  res.sendFile(path.join(__dirname+"/"+"views"+"/payment.html"));
})

router.post("/login", async (req, res) => {
 
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  
  const existinguser = await collection.findOne(data);
  
  if (existinguser) {
    // alert("User already exists")
   
    let options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      //httpOnly: true,
    };

    // Set cookie
    res.cookie("user", String(existinguser._id));
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname + "/" + "views" + "/login.html"));
  }
});
router.post("/signup", async (req, res) => {
  console.log("kk");
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };
  console.log(data);
  const existinguser = await collection.create(data);
  await existinguser.save();
  console.log(existinguser);
  if (existinguser) {
    // alert("User already exists")
    console.log("hi");

    res.sendFile(path.join(__dirname + "/" + "views" + "/login.html"));
  } else {
    res.sendFile(path.join(__dirname + "/" + "views" + "/membership.html"));
  }
});
router.post('/payment', async(req,res)=>{
  try {
    
    const paymentData = {
        billingAddress: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
        },
        paymentInfo: {
            cardName: req.body.cardName,
            cardNum: req.body.cardNum,
            expMonth: req.body.expMonth,
            expYear: req.body.expYear,
            cvv: req.body.cvv,
        },
    };

    console.log("payment successful")
    const newPayment = await payment.insertMany(paymentData);

   
   

    res.redirect("/");
} catch (error) {
  console.log("Payment not successful:", error.message);
  console.log("payment not successful")

  res.sendFile(path.join(__dirname + "/" + "views" + "/payment.html"));
    
}
})
router.post('/contact', async (req, res) => {
  console.log('post route working');
  console.log("hi");

  const data = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
  };

  try {
    
      const newContact = await contact.insertMany(data);
     
      
      res.redirect("/");
  } catch (error) {
      console.error(error);
      res.redirect("/");
    
      
  }
});



module.exports = router;
