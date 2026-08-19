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
// POST /api/tasks
// ==========================================

router.post(
    "/",
    authMiddleware,
    createTask
);


// ==========================================
// GET ALL TASKS
// GET /api/tasks
// ==========================================

router.get(
    "/",
    authMiddleware,
    getTasks
);


// ==========================================
// GET SINGLE TASK
// GET /api/tasks/:id
// ==========================================

router.get(
    "/:id",
    authMiddleware,
    getTaskById
);


// ==========================================
// UPDATE TASK
// PUT /api/tasks/:id
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    updateTask
);


// ==========================================
// DELETE TASK
// DELETE /api/tasks/:id
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    deleteTask
);


module.exports = router;