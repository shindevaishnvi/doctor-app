const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:/Users/kunal/OneDrive/Desktop/b.e final project/doctor-app/backend/.env' });

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const User = mongoose.model('User', new mongoose.Schema({ name: String, email: String }));
        const users = await User.find({});
        console.log('Total Users:', users.length);
        console.log('User Emails:', users.map(u => u.email));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUsers();
