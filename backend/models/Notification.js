const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: { type: String, default: null }, // If notification is for a patient
    docId: { type: String, default: null },  // If notification is for a doctor
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    date: { type: Number, default: Date.now }
});

const notificationModel = mongoose.models.notification || mongoose.model("notification", notificationSchema);

module.exports = notificationModel;
