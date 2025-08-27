const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const faq = require('./routes/faq-Routes')
const categoryRoutes = require("./routes/category-route");
const prodcutRoutes = require("./routes/product-routes");
const review = require('./routes/review-route')
const serviceRoutes = require("./routes/service-route");
const subcategoryroute = require("./routes/subcategory-route")
const eyeCheckRoutes = require("./routes/eyeCheck-routes")
const customerRegistrationRoutes = require("./routes/Customer-register-routes")
const loginRoute = require("./routes/login-routes")
const app = express();
const { default: helmet } = require('helmet');
require("dotenv").config();
const database = require("./config/config")

// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
//versel url frontend
const allowedOrigins = ['https://atal-homepage-new.vercel.app', 'https://atal-dashboard-font.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // only if you're using cookies or sessions,
};
app.use(cors(corsOptions));

//database connect
database.connect();

app.use(express.json());
app.use(helmet());
const path = require('path');
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});
app.use(express.urlencoded({ extended: true }))

app.use('/api', faq);
app.use("/api", categoryRoutes);
app.use("/api", prodcutRoutes);
app.use("/api", serviceRoutes);
app.use("/api", subcategoryroute)
app.use('/api', review)
app.use("/api", eyeCheckRoutes)
app.use("/api", customerRegistrationRoutes)
app.use("/api", loginRoute)

app.listen(4000, () => {
  console.log("server start on Port : 4000");
})