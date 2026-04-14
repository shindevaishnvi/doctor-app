const validator = require("validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/User.js");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const doctorModel = require("../models/Doctor.js");
const appointmentModel = require("../models/Appointment.js");
const MedicalRecord = require("../models/MedicalRecord.js");
let Razorpay = require("razorpay");
const crypto = require("crypto");

// ... initializations

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = { 
            name, 
            email, 
            password: hashedPassword 
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for: ${email}`);
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select("-password");
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select("-password");

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked;

        // checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Booked" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user appointments
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(item => item !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Cancelled" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, gender, dob } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !gender || !dob) {
            return res.json({ success: false, message: "Missing Details" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), gender, dob });

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, message: "Profile Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error("CRITICAL: Razorpay credentials missing from .env");
            return res.json({ success: false, message: "Razopay credentials are missing in backend .env" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or Invalid" });
        }

        if (!appointmentData.amount || appointmentData.amount <= 0) {
            return res.json({ success: false, message: "Invalid appointment amount: " + appointmentData.amount });
        }

        // Handle possible ESM import
        const RazorpayObj = Razorpay.default || Razorpay;

        const razorpayInstance = new RazorpayObj({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: Math.round(Number(appointmentData.amount) * 100),
            currency: process.env.CURRENCY || "INR",
            receipt: appointmentId.toString()
        };

        console.log("Creating Razorpay Order with options:", options);

        try {
            const order = await razorpayInstance.orders.create(options);
            console.log("Razorpay Order Created Successfully:", order.id);
            res.json({ success: true, order });
        } catch (error) {
            console.error("Razorpay API Error Object:", error);
            const errorMsg = error.description || error.message || JSON.stringify(error) || "Unknown Razorpay Error";
            res.json({ success: false, message: "Razorpay Error: " + errorMsg });
        }

    } catch (error) {
        console.error("Internal Server Error in paymentRazorpay:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log("Verifying Payment - Order ID:", razorpay_order_id);
        
        // Verifying the signature
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature === razorpay_signature) {
            console.log("Signature Verified Successfully");
            const RazorpayObj = Razorpay.default || Razorpay;
            const razorpayInstance = new RazorpayObj({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            });

            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
            console.log("Order Fetched - Receipt:", orderInfo.receipt);
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            console.log("Signature Verification Failed");
            res.json({ success: false, message: "Payment Verification Failed" });
        }

    } catch (error) {
        console.log("Detailed Verification Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to add medical record
const addMedicalRecord = async (req, res) => {
    try {
        const { userId, title, description } = req.body;
        const file = req.file;
        
        if (!title || !file) {
            return res.json({ success: false, message: "Title and File are required" });
        }
        
        const fileUpload = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });
        const fileUrl = fileUpload.secure_url;
        
        const newRecord = new MedicalRecord({
            userId,
            title,
            description,
            fileUrl,
            date: Date.now()
        });
        
        await newRecord.save();
        res.json({ success: true, message: "Record Added Successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get medical records
const getMedicalRecords = async (req, res) => {
    try {
        const { userId } = req.body;
        const records = await MedicalRecord.find({ userId }).sort({ date: -1 });
        res.json({ success: true, records });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to delete medical record
const deleteMedicalRecord = async (req, res) => {
    try {
        const { userId, recordId } = req.body;
        const record = await MedicalRecord.findById(recordId);
        
        if (record.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }
        
        await MedicalRecord.findByIdAndDelete(recordId);
        res.json({ success: true, message: "Record Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get live queue data
const getLiveQueue = async (req, res) => {
    try {
        const { userId } = req.body;
        const userAppointments = await appointmentModel.find({ userId, cancelled: false, isCompleted: false });
        
        const liveQueueData = [];
        for (const appt of userAppointments) {
            const { docId, slotDate } = appt;
            const sameDayAppts = await appointmentModel.find({ docId, slotDate, cancelled: false, isCompleted: false });
            
            // Sorting simply by 'slotTime' string. Ensure correct format if possible.
            const sorted = sameDayAppts.sort((a, b) => a.slotTime.localeCompare(b.slotTime));
            
            const position = sorted.findIndex(a => a._id.toString() === appt._id.toString()) + 1;
            
            liveQueueData.push({
                appointment: appt,
                position,
                totalPending: sorted.length
            });
        }
        
        res.json({ success: true, liveQueueData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { registerUser, loginUser, getProfile, bookAppointment, listAppointment, cancelAppointment, updateProfile, paymentRazorpay, verifyRazorpay, addMedicalRecord, getMedicalRecords, deleteMedicalRecord, getLiveQueue };

