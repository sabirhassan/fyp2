let express = require("express");
let app= express();

var myParser = require("body-parser");

app.use(express.static("../static"));
app.use(myParser.json());


app.listen(5001, function(){
    console.log('serving static at 5001')
});