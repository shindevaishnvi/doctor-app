const mongoose = require("mongoose");

const bloodDonorSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    available: { type: Boolean, default: true },
    dateRegistered: { type: Number, default: Date.now }
});

module.exports = mongoose.model("BloodDonor", bloodDonorSchema);
