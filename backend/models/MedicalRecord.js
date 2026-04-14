const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    date: { type: Number, required: true }
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
