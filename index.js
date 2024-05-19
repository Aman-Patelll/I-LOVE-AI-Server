const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes");
const cloudinary = require("cloudinary");

const app = express(); // creating app server
app.use(cors()); // for 2 port running (frontend + backend) in single machine
app.use(bodyParser.json()); // post request and sending json object

// Cloudinary Config
cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

dotenv.config();

app.use("/", chatRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));
