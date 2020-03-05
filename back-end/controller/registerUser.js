
var sendJSONresponse = function(res, status, content) { //ADDED BY SALLAHUDDIN
    res.status(status);
    res.json(content);
  };


module.exports.registerUser = function (req, res) {

    console.log(req.body);
    insertRecord(req,res);
    
};


function insertRecord(req, res) {

    var mail = req.body.email;
    
    let userRef = db.collection('user');
    let query = userRef.where('email', '==', mail).get()
    .then(snapshot => {
        if (snapshot.empty) {
            
            db.collection('user').add({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            }).then(ref => {
                res.send("success");
              })
              .catch(err=>{
                  res.send("Error"+ err);
              });

        }
        else
        {
            res.send("Error: user already exists!");
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

    

}
/*
module.exports.checkEmail = function (req, res) {  //ADDED BY SALLAHUDDIN
    console.log("YEEEEEEEHAW")
    var mail = req.params.email;

    let userRef = db.collection('user');
    let query = userRef.where('email', '==', mail).get()
    .then(snapshot => {
        if (snapshot.empty) {
            var myobj = {
            
                EmailNameInUse:true
                
            };
            console.log(myobj.EmailNameInUse);
            sendJSONresponse(res,200,myobj);
        }
        else
        {
            var myobj = {
            
                EmailNameInUse:false
            }
            console.log(myobj.EmailNameInUse);
            sendJSONresponse(res,200,myobj);
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
    
};*/

module.exports.checkEmail = function (req, res) {  //ADDED BY SALLAHUDDIN
    console.log("node api")
    var mail = req.query.email;
    console.log(mail);
    let userRef = db.collection('user');
    let query = userRef.where('email', '==', mail).get()
    .then(snapshot => {
        if (snapshot.empty) {
            var myobj = {
            
                EmailNameInUse:false
                
            };
            //console.log(myobj.EmailNameInUse);
            sendJSONresponse(res,200,myobj);
        }
        else
        {
            var myobj = {
            
                EmailNameInUse:true
            }
            //console.log(myobj.EmailNameInUse);
            sendJSONresponse(res,200,myobj);
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
    
};