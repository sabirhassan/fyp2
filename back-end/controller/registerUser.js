
var sendJSONresponse = function(res, status, content) { //ADDED BY SALLAHUDDIN
    res.status(status);
    res.json(content);
  };


module.exports.showpage = function (req, res) {
    if(req.session.email) 
    {
        var id =req.session._id;
        var mail = req.session.email;
        var pass = req.session.password;

        let userRef = db.collection('user').doc(id);
        let getDoc = userRef.get()
          .then(doc => {
            if (!doc.exists) {
              res.send("user does not exists!");
            } else {
                var data=doc.data();
                if(data.userType=="admin" && mail==data.email && pass == data.password)
                {
                    res.statuscode = 200;
                    res.render("register");
                }

            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });

    }
    else
    {
        res.render("login");
    }

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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
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

module.exports.checkEmail = function (req, res) {  //ADDED BY SALLAHUDDIN
    console.log("YEEEEEEEHAW")
    var mail = req.query.email;

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
    
};