require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


// ==========================================
// HOME & HEALTH ROUTES
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "Student Task Management API is running! 🚀",
        status: "success"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});


// ==========================================
// ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/test", testRoutes);


// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        path: req.originalUrl
    });
});


// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;