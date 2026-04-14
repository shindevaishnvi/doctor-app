const express = require("express");
const { registerUser, loginUser, getProfile, bookAppointment, listAppointment, cancelAppointment, updateProfile, paymentRazorpay, verifyRazorpay, addMedicalRecord, getMedicalRecords, deleteMedicalRecord, getLiveQueue } = require("../controllers/userController.js");
const authUser = require("../middlewares/authUser.js");
const upload = require("../middlewares/multer.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/update-profile", authUser, upload.single('image'), updateProfile);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verify-razorpay", authUser, verifyRazorpay);

userRouter.post("/add-medical-record", authUser, upload.single('document'), addMedicalRecord);
userRouter.get("/medical-records", authUser, getMedicalRecords);
userRouter.post("/delete-medical-record", authUser, deleteMedicalRecord);
userRouter.get("/live-queue", authUser, getLiveQueue);

module.exports = userRouter;
