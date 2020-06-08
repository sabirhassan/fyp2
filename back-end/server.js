const express = require('express');
const app = express();
const routes = require("./routes/index.js");
const ejs = require('ejs');
var myParser = require("body-parser");
const session = require('express-session');

app.set('view engine', 'ejs');

const cors = require('cors');
const PORT = 4000;

var admin = require("firebase-admin");

var serviceAccount = require("./automated-diagnostic-system-firebase-adminsdk-swcns-1c87072bdb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://automated-diagnostic-system.firebaseio.com"
});

global.db = admin.firestore();

app.use(cors());
//setting middleware
app.use(express.static('public')); //Serves resources from public folder
app.use(session({secret: 'ssshhhhh'}));

app.use(myParser.json({limit: '50mb'}));

app.use("/", routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});