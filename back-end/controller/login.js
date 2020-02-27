
module.exports.showpage = function (req, res) {
  res.statuscode = 200;
  res.render("login");
};

module.exports.loginpost = function (req, res) {

    console.log(req.body);
    check_credentials(req, res);
  };

async  function check_credentials(req, res) {
    var mail = req.body.email;
    var pass = req.body.password;
    var flag =false;
    console.log(mail,pass);

    await db.collection('user').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        var data = doc.data();
        if(data.email==mail && data.password==pass)
        {
          flag = true;
          req.session._id = doc.id;
          req.session.email = req.body.email;
          req.session.password = req.body.password;

          if(data.userType=="admin")
          {
            res.statuscode = 200;
            res.json({"type":"admin","id":doc.id,"email":req.body.email,"password":req.body.password});
          }
          else if(data.userType=="doctor")
          {
            res.statuscode = 200;
            res.json({"type":"doctor","id":doc.id,"email":req.body.email,"password":req.body.password});
          }
          else if(data.userType=="doctor assistant")
          {
            res.statuscode = 200;
            res.json({"type":"doctorAssistant","id":doc.id,"email":req.body.email,"password":req.body.password});
          }
          else if(data.userType=="lab staff")
          {
            res.statuscode = 200;
            res.json({"type":"labStaff","id":doc.id,"email":req.body.email,"password":req.body.password});
          }

        }

      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    if(!flag)
    {
      res.send("invalid credentials")
    }

  }