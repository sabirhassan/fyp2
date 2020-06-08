var sendJSONresponse = function(res, status, content) { //ADDED BY SALLAHUDDIN
    res.status(status);
    res.json(content);
  };

module.exports.addSkinCancerReport = function (req, res) {
    //console.log(req.body);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var adDate = mm + '/' + dd + '/' + yyyy;
    console.log(adDate);


    db.collection('reports').add({
        contact: req.body.contact,
        prediction: req.body.prediction,
        model: req.body.model,
        image:req.body.image,
        dateadded:adDate,

    }).then(ref => {
        sendJSONresponse(res,200,"data added");
      })
      .catch(err=>{
        sendJSONresponse(res,400,err);
      });

    
};

module.exports.addratinopathyReport = function (req, res) {
  //console.log(req.body);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var adDate = mm + '/' + dd + '/' + yyyy;
  console.log(adDate);


  db.collection('reports').add({
      contact: req.body.contact,
      prediction: req.body.prediction,
      model: req.body.model,
      image:req.body.image,
      dateadded:adDate,

  }).then(ref => {
      res.send("success")
    })
    .catch(err=>{
      res.send("error " + err)
    });

  
};

var count = 0

module.exports.getReports = function (req, res) {
  console.log("reports",count++)
  var contact = req.body.contact;
  
  var reports = [];

  let userRef = db.collection('reports');
  let query = userRef.where('contact', '==', contact)
  .get()
  .then(snapshot => {
      if (snapshot.empty) {
          res.send("empty")
      }
      else
      {
          snapshot.forEach((doc) => {
            let item = doc.data()
            item['id']=doc.id
            reports.push(item);
            });

            res.send(reports);
      }  
  })
  .catch(err => {
      console.log('Error getting documents', err);
  });

  
};
