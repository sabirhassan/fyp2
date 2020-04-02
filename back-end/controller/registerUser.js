
module.exports.registerUser = function (req, res) {

    console.log(req.body);
    insertRecord(req,res);
    
};

module.exports.getdoctors = function (req, res) {

    retrieveDoctors(req,res);
    
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
            res.send("alreadyExists");
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });


}

var count = 0

function retrieveDoctors(req, res) {

    console.log("doctor",count++);
    
    var doctors = [];

    let userRef = db.collection('user');
    let query = userRef.where('userType', '==', "doctor").get()
    .then(snapshot => {
        if (snapshot.empty) {
            
            res.send("empty")

        }
        else
        {
            snapshot.forEach((doc) => {
                var data = doc.data();
                doctors.push(data.name);
              });

              res.send(doctors);
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
    
}

/*module.exports.checkEmail = function (req, res) {  //ADDED BY SALLAHUDDIN
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
    
};*/