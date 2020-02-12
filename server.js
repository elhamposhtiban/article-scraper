
// setting requirments to variables
const express = require ("express");
const mongoose = require ("mongoose");
const handlebars = require ("express-handlebars");

const axios = require ("axios");
const cheerio = require ("cheerio");

// Require all models

const db = require ("./models");

// Set the port of our application
const PORT = process.env.PORT || 2020;

const app = express();
//parse request body as JSON 
app.use (express.urlencoded({extended:true}));
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static(__dirname +'/public'));

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

mongoose.connect(MONGODB_URI);

  app.get("/", function(req, res) {
    res.render("index.handlebars",res)
  });

/////////////routes 
// require("./routes/htmlRoutes.js")(app);
// require("./routes/apiRoutes.js")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });