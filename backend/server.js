const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const doctorRoutes = require("./routes/doctorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const aiRouter = require("./routes/aiRouter"); // ✅ now CommonJS



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads")); // Serve images

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/doctors", doctorRoutes);   // All doctor-related routes
app.use("/api/bookings", bookingRoutes); // All booking-related routes
app.use("/api/ai", aiRouter);//AI routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
