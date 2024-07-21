const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require('path');
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const listingRoutes = require("./routes/Listing")
const userRoutes = require("./routes/user")
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/users", userRoutes);
app.use("/bookings" , bookingRoutes);

// Mongoose Setup
const PORT = 3001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((err) => console.log(`${err} did not connect`));

