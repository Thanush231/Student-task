const express = require("express");

const router = express.Router();


// ==========================================
// TEST ROUTE
// GET /api/test
// ==========================================

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Task API is working!",
        status: "success"
    });
});


module.exports = router;