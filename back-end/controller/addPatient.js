module.exports.registerPatient = function (req, res) {

    console.log(req.body);
    insertRecord(req,res);
    
};
function parseDate(date) { 
    var arr = date.split("-");
    var year =arr[0];
    var month = arr[1];
    arr=arr[2].split("T"); 
    var day= arr[0]; 
    
    var d = {day:day,month:month,year:year};

    return d;
} 


function insertRecord(req, res) {

    var contact = req.body.contact;
    var date= parseDate(req.body.dob);
    

    let userRef = db.collection('patient');
    let query = userRef.where('contact', '==', contact).get()
    .then(snapshot => {
        if (snapshot.empty) {
            
            db.collection('patient').add({
                name: req.body.name,
                contact: req.body.contact,
                password: req.body.password,
                gender:req.body.gender,
                dob:{
                    day:date.day,
                    month:date.month,
                    year:date.year
                }

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