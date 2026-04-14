const express = require("express");
const { addDoctor, loginAdmin, allDoctors, adminDashboard, changeAvailability, appointmentsAdmin, appointmentCancel, appointmentComplete, removeDoctor, updateDoctorCredentials } = require("../controllers/adminController.js");
const upload = require("../middlewares/multer.js");
const authAdmin = require("../middlewares/authAdmin.js");

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.post("/complete-appointment", authAdmin, appointmentComplete);
adminRouter.post("/remove-doctor", authAdmin, removeDoctor);
adminRouter.post("/update-doctor-credentials", authAdmin, updateDoctorCredentials);

module.exports = adminRouter;
