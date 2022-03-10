//require dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

//Initalize express 
const app = express();
const PORT = process.env.PORT || 3000;

//Setup data passing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//require routes
app.use("/", require('./routes/route'));

//Setup listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});