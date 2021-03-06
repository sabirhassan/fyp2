const express = require('express');
const ctrl_login = require("../controller/login.js");
const ctrl_registerUser = require("../controller/registerUser.js");
const ctrl_changePassword = require("../controller/changePassword.js");
const ctrl_resetPassword = require("../controller/resetPassword.js");
const ctrl_registerPatient = require("../controller/addPatient.js");
const ctrl_patientPrescription = require("../controller/prescription.js");
const ctrl_medicine = require("../controller/medicine.js");
const ctrl_requests = require("../controller/followupRequests");
const ctrl_reports = require("../controller/reports");
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
    .route("/getpatientslist")
    .post(ctrl_registerPatient.getPatientsList)

router
    .route("/getPrescription")
    .post(ctrl_patientPrescription.getPrescription)

router
    .route("/addPrescription")
    .post(ctrl_patientPrescription.addPrescription)

router
    .route("/addMedicine")
    .post(ctrl_medicine.addMedicine)

router
    .route("/getMedicines")
    .post(ctrl_medicine.getMedicines)    

router
    .route("/deleteMedicine")
    .post(ctrl_medicine.deleteMedicine)    

router
    .route("/updateMedicine")
    .post(ctrl_medicine.updateMedicine)    

router
    .route("/getrequests")
    .post(ctrl_requests.getRequests)    

router
    .route("/acceptrequest")
    .post(ctrl_requests.acceptRequest)    

router
    .route("/rejectrequest")
    .post(ctrl_requests.rejectRequest)
    
router
    .route("/getAppointments")
    .post(ctrl_requests.getAppointments)

router
    .route("/cancelAppointment")
    .post(ctrl_requests.cancelAppointment)

router
    .route("/insertSkinCancerReport")
    .post(ctrl_reports.addSkinCancerReport)    

router
    .route("/addratinopathyreport")
    .post(ctrl_reports.addratinopathyReport)    

router
    .route("/getReports")
    .post(ctrl_reports.getReports)    

router
    .route("/updatePrescriptionStatus")
    .get(ctrl_patientPrescription.updateStatus)
module.exports = router;