const express = require("express");
const { registerUser, loginUser, getProfile, bookAppointment, listAppointment, cancelAppointment, updateProfile } = require("../controllers/userController.js");
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

module.exports = userRouter;
