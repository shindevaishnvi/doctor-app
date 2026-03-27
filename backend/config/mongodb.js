const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    mongoose.connection.on('error', (err) => console.log("DB Error:", err.message));
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
            serverSelectionTimeoutMS: 10000,
        });
    } catch (err) {
        console.log("MongoDB Connection Failed:", err.message);
        // Don't crash the server — retry after 5 seconds
        setTimeout(connectDB, 5000);
    }
}

module.exports = connectDB;
