const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const router = express.Router();


// ==========================================
// CREATE TASK
// ==========================================

router.post(
    "/",
    authMiddleware,
    createTask
);


// ==========================================
// GET ALL TASKS
// ==========================================

router.get(
    "/",
    authMiddleware,
    getTasks
);


// ==========================================
// GET SINGLE TASK
// ==========================================

router.get(
    "/:id",
    authMiddleware,
    getTaskById
);


// ==========================================
// UPDATE TASK
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    updateTask
);


// ==========================================
// DELETE TASK
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    deleteTask
);


module.exports = router;