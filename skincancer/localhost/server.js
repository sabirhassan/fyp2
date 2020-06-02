let express = require("express");
let app= express();


app.use(express.static("../static"));


app.listen(5000, function(){
    console.log('serving static at 5000')
});