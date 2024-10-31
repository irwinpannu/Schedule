const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const bookings = [];

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pannu.irwin@gmail.com", // Replace with your email
        pass: "kyzd rydf ldte ubuj",  // Replace with your email password
    },
});

// Handle booking requests
app.post("/api/book", (req, res) => {
    const { date, time, name, email, purpose } = req.body;

    // Check if the slot is already booked
    if (bookings.find(b => b.date === date && b.time === time)) {
        return res.status(400).json({ message: "This slot is already booked." });
    }

    // Add the booking to the array
    bookings.push({ date, time, name, purpose });

    // Send confirmation email to user
    transporter.sendMail({
        from: "pannu.irwin@gmail.com",
        to: email,
        subject: "Booking Confirmation",
        text: `Your booking on ${date} at ${time} for "${purpose}" is confirmed.`,
    });

    // Send update email with all bookings
    transporter.sendMail({
        from: "pannu.irwin@gmail.com",
        to: "pannu.irwin@gmail.com",
        subject: "New Booking Added",
        html: bookings
            .map(b => `<tr><td>${b.date}</td><td>${b.time}</td><td>${b.name}</td><td>${b.purpose}</td></tr>`)
            .join(""),
    });

    res.json({ message: "Booking confirmed! You will receive a confirmation email shortly." });
});

app.use(express.static("public")); // Serve static files

app.listen(3000, () => console.log("Server running on http://localhost:3000"));