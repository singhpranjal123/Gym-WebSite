const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config()
const bodyParser = require('body-parser')
const admin = require('./route')

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(admin)


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
