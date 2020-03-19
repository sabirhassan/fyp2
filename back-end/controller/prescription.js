var sendJSONresponse = function(res, status, content) { //ADDED BY SALLAHUDDIN
    res.status(status);
    res.json(content);
  };

module.exports.getPrescription = function (req, res) { 
    console.log("node api")
    var contact = req.query.contact;
    let userRef = db.collection('Prescriptions');
    var pres = [];
    let query = userRef.where('contact', '==', contact).get()
    .then(snapshot => {
        if(!snapshot.empty){
        snapshot.forEach((doc) => {
            pres.push(doc.data());
        });
            //const myobj = snapshot.val();
            console.log(pres);
            var myObj = {
                medicine : pres,
                isEmpty:false
            };
            sendJSONresponse(res,200,myObj);
        
        }
        else{
            var myObj = {
                isEmpty : true
            };
            sendJSONresponse(res,200,myObj);
        }
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });



};

module.exports.addPrescription = function(req,res){
    console.log("Adding prescriptin");
    db.collection('Prescriptions').add({
        medicine : req.body.medicineName,
        contact: req.body.patientContact,
        doctor: req.body.doctor,
        morning:req.body.morning,
        afternoon:req.body.afternoon,
        evening:req.body.evening,
        notify:true,
        status:true
    }).then(ref => {
        res.send("success");
      })
      .catch(err=>{
          res.send("Error"+ err);
      });
}