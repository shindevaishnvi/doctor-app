const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:/Users/kunal/OneDrive/Desktop/b.e final project/doctor-app/backend/.env' });

async function checkUsers() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            tlsAllowInvalidCertificates: true
        });
        console.log('Connected!');
        const User = mongoose.model('User', new mongoose.Schema({ name: String, email: String }));
        const users = await User.find({});
        console.log('Total Users:', users.length);
        console.log('User Emails:', users.map(u => u.email));
        process.exit(0);
    } catch (err) {
        console.error('Connection Error:', err.message);
        process.exit(1);
    }
}

checkUsers();
