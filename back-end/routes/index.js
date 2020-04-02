const express = require('express');
const ctrl_login = require("../controller/login.js");
const ctrl_registerUser = require("../controller/registerUser.js");
const ctrl_changePassword = require("../controller/changePassword.js");
const ctrl_resetPassword = require("../controller/resetPassword.js");
const ctrl_registerPatient = require("../controller/addPatient.js");
const ctrl_patientPrescription = require("../controller/prescription.js");

const router = express.Router();

router
    .route("/login")
    .post(ctrl_login.loginpost);


router
    .route("/register")
    .post(ctrl_registerUser.registerUser);

router
    .route("/getdoctors")
    .post(ctrl_registerUser.getdoctors);    

router
    .route("/updatepassword")
    .post(ctrl_changePassword.updatePassword);


router
    .route("/passwordreset")
    .post(ctrl_resetPassword.resetPassword);


router
    .route("/addpatient")
    .post(ctrl_registerPatient.registerPatient)

router
    .route("/getpatients")
    .post(ctrl_registerPatient.getPatients)



router
    .route("/getPrescription")
    .post(ctrl_patientPrescription.getPrescription)

router
    .route("/addPrescription")
    .post(ctrl_patientPrescription.addPrescription)
module.exports = router;