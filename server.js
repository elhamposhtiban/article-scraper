
// setting requirments to variables
const express = require ("express");
const mongoose = require ("mongoose");
const exphbs = require ("express-handlebars");
const logger = require("morgan");
const axios = require ("axios");
const cheerio = require ("cheerio");


// Set the port of our application
const PORT = process.env.PORT || 2020;

// Initialize Express
const app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
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

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });


/////////////routes 
require("./routes/apiRoutes")(app);
require("./routes/htmRoutes")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });

  mongoose.set('useCreateIndex', true)