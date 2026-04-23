const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/mongodb.js");
const connectCloudinary = require("./config/cloudinary.js");
const startCronJobs = require("./services/cronService.js");
const adminRouter = require("./routes/doctorRoutes.js"); // Using doctorRoutes.js as adminRouter as refactored above
const doctorRouter = require("./routes/doctorRoute.js");
const userRouter = require("./routes/userRoutes.js");

// app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();
startCronJobs();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("API Working Successfully 🚀");
});

app.listen(port, () => console.log(`Server started on port ${port}`));