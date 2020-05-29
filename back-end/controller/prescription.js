var sendJSONresponse = function(res, status, content) { //ADDED BY SALLAHUDDIN
    res.status(status);
    res.json(content);
  };
/*
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



};*/

/*
module.exports.addPrescription = function(req,res){
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    // prints date & time in YYYY-MM-DD format
    var d = year + "-" + month + "-" + date;
    
    console.log("Adding prescriptin");
    console.log(req.body);
        db.collection('prescription').add({
            name:req.body.name,
            contact: req.body.contact,
            doctor: req.body.doctor,
            date:d,
            notify:true,
            status:true,
            prescription: req.body.prescriptions.map((item, index) => {
                const { medicine, dosage,days, morning,afternoon,evening,instructions } = item 
                return ( {
                    medicine:medicine,
                    dosage:dosage,
                    days:days,
                    morning:morning,
                    afternoon:afternoon,
                    evening:evening,
                    instructions:instructions
                })
                
             }),

        }).then(ref => {
            res.send("success");
          })
          .catch(err=>{
            res.send("Error"+ err);
        });
    
}


*/


module.exports.addPrescription = function(req,res){
    console.log("Adding prescriptin");
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    // prints date & time in YYYY-MM-DD format
    var d = year + "-" + month + "-" + date;

    

    let contact = req.body.contact
    let doctor = req.body.doctor


    for(let item of req.body.prescriptions)
    {
        db.collection('Prescriptions').add({
            contact:contact,
            doctor:doctor,
            date:d,
            medicine : item.medicine,
            dosage : item.dosage,
            days:item.days,
            morning:item.morning,
            afternoon:item.afternoon,
            evening:item.evening,
            instructions:item.instructions,
            notify:true,
            status:true
        });
    }

    res.send("success");


}


module.exports.getPrescription = function(req,res){
    
    console.log("getting prescription");
    console.log(req.body);
    var contact = req.body.contact;
    var name = req.body.name;
    
    var pres = [];

    let userRef = db.collection('Prescriptions');
    let query = userRef.where('contact', '==', contact)
    .get()
    .then(snapshot => {
        if (snapshot.empty) 
        {
            res.send("empty")
        }
        else
        {
            snapshot.forEach((doc) => {
                pres.push(doc.data());
            });
            console.log(pres)
            res.send(pres);
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });    
}
