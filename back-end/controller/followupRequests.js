module.exports.getRequests = function(req,res){
    
    console.log("getting Requests");
    console.log(req.body);
    var email = req.body.email;
    
    var requests = [];

    let Ref = db.collection('FollowOns');
    let query = Ref.where('email', '==', email)
    .where('status', '==' , false)
    .get()
    .then(snapshot => {
        if (snapshot.empty) 
        {
            res.send("empty")
        }
        else
        {
            snapshot.forEach((doc) => {
                let item = doc.data()
                item['id']=doc.id
                requests.push(item);
            });
            console.log(requests)
            res.send(requests);
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });    
}

module.exports.acceptRequest = function(req,res){
    
    console.log("Accepting Request");
    console.log(req.body);
    var id = req.body.id;
    

    let requests = db.collection('FollowOns').doc(id);
    requests.update({
        status:true,
        requested:false,
    }).
    then(()=>{
        res.send("success")
    })
    .catch(err => {
        console.log('Error updating documents', err);
    });    
}

module.exports.rejectRequest = function(req,res){
    
    console.log("rejecting Request");
    console.log(req.body);
    var id = req.body.id;
    

    let requests = db.collection('FollowOns').doc(id);
    requests.delete().
    then(()=>{
        res.send("success")
    })
    .catch(err => {
        console.log('Error deleting documents', err);
    });    
}

module.exports.getAppointments = function(req,res){
    
    console.log("getting Appointments");
    console.log(req.body);
    var email = req.body.email;
    
    var requests = [];

    let Ref = db.collection('FollowOns');
    let query = Ref.where('email', '==', email)
    .where('status', '==' , true)
    .get()
    .then(snapshot => {
        if (snapshot.empty) 
        {
            res.send("empty")
        }
        else
        {
            snapshot.forEach((doc) => {
                let item = doc.data()
                item['id']=doc.id
                requests.push(item);
            });
            console.log(requests)
            res.send(requests);
        }  
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });    
}


module.exports.cancelAppointment = function(req,res){
    
    console.log("Cancel Apointment");
    console.log(req.body);
    var id = req.body.id;
    

    let requests = db.collection('FollowOns').doc(id);
    requests.delete().
    then(()=>{
        res.send("success")
    })
    .catch(err => {
        console.log('Error deleting documents', err);
    });    
}