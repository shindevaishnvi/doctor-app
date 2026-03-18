const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Book appointment
router.post("/book", async (req, res) => {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.send("Appointment booked");
});
// GET all appointments
router.get("/", async (req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
});
module.exports = router;