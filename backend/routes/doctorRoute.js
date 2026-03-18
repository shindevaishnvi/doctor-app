const express = require("express");
const { loginDoctor, appointmentsDoctor, doctorProfile, appointmentComplete, appointmentCancel, doctorDashboard, updateDoctorProfile, doctorList } = require("../controllers/doctorController.js");
const authDoctor = require("../middlewares/authDoctor.js");

const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.get("/list", doctorList);

module.exports = doctorRouter;


