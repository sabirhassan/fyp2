

module.exports.updatePassword = function (req, res) {

    console.log(req.body);
    updateRecord(req,res);
    
};

async function updateRecord(req,res){


    var oldPass = req.body.oldPass;
    var enteredOldPass = req.body.old;

    console.log(oldPass,enteredOldPass);
    
    if (oldPass != enteredOldPass){
      console.log("old password does not match with database records")
      res.send("old password does not match with database records");
    }
    else{
    var id = req.body.id;
    var newPass = req.body.new;
    let userRef = db.collection('user').doc(id);
    userRef.update({password: newPass});
    res.send("success");
    }
}
