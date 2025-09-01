const express = require('express');
const path = require('path');
require("dotenv").config();

const faq = require('./routes/faq-Routes');
const categoryRoutes = require("./routes/category-route");
const prodcutRoutes = require("./routes/product-routes");
const review = require('./routes/review-route');
const serviceRoutes = require("./routes/service-route");
const subcategoryroute = require("./routes/subcategory-route");
const eyeCheckRoutes = require("./routes/eyeCheck-routes");
// const vendorRoutes = require("./routes/vendor-route");
const customerRegistrationRoutes = require("./routes/Customer-register-routes");
const loginRoute = require("./routes/login-routes");
const adminRoute = require("./routes/auth-routes");
const wishlistRoute = require("./routes/wishlist-route")

const database = require("./config/config");
const cors = require('cors');

const app = express();

// Allowed origins
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
// For production, replace with your Vercel URLs
const allowedOrigins = ['https://atal-homepage-new.vercel.app', 'https://atal-dashboard-font.vercel.app'];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Important: set false for image requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
database.connect();

// Serve uploads folder via API route with proper CORS
app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "uploads", filename);
  // Set exact allowed origin
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Origin", "https://atal-homepage-new.vercel.app");
  res.sendFile(filepath, (err) => {
    if (err) {
      res.status(404).json({ success: false, message: "Image not found" });
    }
  });
});

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// API routes
app.use('/api', faq);
app.use("/api", categoryRoutes);
app.use("/api", prodcutRoutes);
app.use("/api", serviceRoutes);
app.use("/api", subcategoryroute);
app.use('/api', review);
app.use("/api", eyeCheckRoutes);
// app.use("/api", vendorRoutes);
app.use("/api", customerRegistrationRoutes);
app.use("/api", loginRoute);
app.use("/api", adminRoute);
app.use("/api", wishlistRoute);

// Start server
app.listen(4000, () => {
  console.log("Server started on Port: 4000");
});
