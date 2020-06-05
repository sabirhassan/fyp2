let express = require("express");
let app= express();


app.use(express.static("../static"));


app.listen(8000, function(){
    console.log('serving static at 8000')
});