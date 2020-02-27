
module.exports.resetPassword = function (req, res) {

    console.log(req.body);
    updateRecord(req,res);
    
};

async function updateRecord(req,res){
    console.log(req.session);
    let flag = false;
    var mail = req.body.email;
    var pass = req.body.password;

    let userRef = db.collection('user');
    await userRef.where('email', '==', mail).get()
    .then(snapshot => {
        if (snapshot.empty) {
            res.send("no user exists with this id!");
        }
        else
        {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                let userRef = db.collection('user').doc(doc.id);
                userRef.update({password: pass});
                flag=true;
              });
            res.send("success");
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
        res.send("Error: "+err);
    });


}
