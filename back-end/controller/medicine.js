module.exports.addMedicine = function (req, res) {
    console.log(req.body);
    insertRecord(req,res);
};

module.exports.getMedicines = function (req, res) {

    console.log(req.body);
    retrieveRecord(req,res);
    
};

module.exports.deleteMedicine = function (req, res) {

    console.log(req.body);
    deleteRecord(req,res);
    
};

module.exports.updateMedicine = function (req, res) {

    console.log(req.body);
    updateRecord(req,res);
    
};



function insertRecord(req, res) {

    let Ref = db.collection('medicines');
    let query = Ref.where('Drug Name', '==', req.body["Drug Name"]).
                where('Form', '==', req.body["Form"])
                .where('Strength', '==', req.body["Strength"])
                .where('Active Ingredient', '==', req.body["Active Ingredient"]).get()
    .then(snapshot => {
        if (snapshot.empty) {
            
            db.collection('medicines').add({
                'Drug Name': req.body["Drug Name"],
                'Form': req.body["Form"],
                'Strength': req.body["Strength"],
                'Active Ingredient':req.body["Active Ingredient"],
                
            }).then(ref => {
                res.send("success");
              })
              .catch(err=>{
                  res.send("Error"+ err);
              });

        }
        else
        {
            res.send("Error: medicine already exists!");
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
        
    });

    
}

var count = 0

function retrieveRecord(req, res) {

    console.log("medicine retrieve",count++)
    
    var medicines = []


    let userRef = db.collection('medicines');
    let query = userRef.get()
    .then(snapshot => {
        if (snapshot.empty) {

            res.send("empty")
        
        }
        else
        {
            snapshot.forEach((doc) => {
                let data = doc.data();
                let id = doc.id;
                data.id =id;
                medicines.push(data);
              });

              res.send(medicines);
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
    
}



function deleteRecord(req, res) {

    let deleteDoc = db.collection('medicines').doc(req.body.id).delete().then(ref => {
        res.send("success");
      })
      .catch(err=>{
          res.send("Error"+ err);
      });

}

function updateRecord(req, res) {

    let data ={
        'Drug Name': req.body["Drug Name"],
        'Form': req.body["Form"],
        'Strength': req.body["Strength"],
        'Active Ingredient':req.body["Active Ingredient"],
    }

    let setDoc = db.collection('medicines').doc(req.body.id).set(data).then(ref => {
        res.send("success");
      })
      .catch(err=>{
          res.send("Error"+ err);
      });

}