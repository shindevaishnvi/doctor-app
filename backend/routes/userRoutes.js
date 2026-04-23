const express = require("express");
const { registerUser, loginUser, getProfile, bookAppointment, listAppointment, cancelAppointment, updateProfile, paymentRazorpay, verifyRazorpay, addMedicalRecord, getMedicalRecords, deleteMedicalRecord, getLiveQueue, registerBloodDonor, getBloodDonors, toggleDonorStatus, getMyDonorStatus, getNotifications, markNotificationsAsRead } = require("../controllers/userController.js");
const authUser = require("../middlewares/authUser.js");
const upload = require("../middlewares/multer.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verify-razorpay", authUser, verifyRazorpay);

userRouter.post("/add-medical-record", upload.single('document'), authUser, addMedicalRecord);
userRouter.get("/medical-records", authUser, getMedicalRecords);
userRouter.post("/delete-medical-record", authUser, deleteMedicalRecord);
userRouter.get("/live-queue", authUser, getLiveQueue);

userRouter.post("/register-donor", authUser, registerBloodDonor);
userRouter.get("/blood-donors", getBloodDonors); // Public read
userRouter.post("/toggle-donor", authUser, toggleDonorStatus);
userRouter.get("/my-donor-status", authUser, getMyDonorStatus);

userRouter.get("/notifications", authUser, getNotifications);
userRouter.post("/notifications/mark-read", authUser, markNotificationsAsRead);

module.exports = userRouter;
