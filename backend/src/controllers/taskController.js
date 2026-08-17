const supabase = require("../config/supabase");

// ==========================================
// CREATE TASK
// ==========================================

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            due_date
        } = req.body;

        // 1. Check user authentication
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 2. Get user ID from JWT
        const userId = req.user.userId;

        // 3. Validate title
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        // 4. Validate priority
        const allowedPriorities = [
            "Low",
            "Medium",
            "High"
        ];

        if (
            priority &&
            !allowedPriorities.includes(priority)
        ) {
            return res.status(400).json({
                message: "Priority must be Low, Medium or High"
            });
        }

        // 5. Insert task into Supabase
        const { data, error } = await supabase
            .from("tasks")
            .insert([
                {
                    title: title.trim(),
                    description: description || null,
                    priority: priority || "Medium",
                    user_id: userId,
                    due_date: due_date || null
                }
            ])
            .select("*")
            .single();

        // 6. Handle Supabase error
        if (error) {
            console.error("Supabase task error:", error);

            return res.status(500).json({
                message: "Failed to create task",
                error: error.message
            });
        }

        // 7. Send successful response
        return res.status(201).json({
            message: "Task created successfully",
            task: data
        });

    } catch (error) {
        console.error("Create task error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
// ==========================================
// GET ALL TASKS FOR LOGGED-IN USER
// ==========================================

const getTasks = async (req, res) => {
    try {
        // 1. Check authentication
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 2. Get user ID from JWT
        const userId = req.user.userId;

        // 3. Get only this user's tasks
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", {
                ascending: false
            });

        // 4. Handle Supabase error
        if (error) {
            console.error("Get tasks error:", error);

            return res.status(500).json({
                message: "Failed to get tasks",
                error: error.message
            });
        }

        // 5. Return tasks
        return res.status(200).json({
            message: "Tasks retrieved successfully",
            count: data.length,
            tasks: data
        });

    } catch (error) {
        console.error("Get tasks error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
// ==========================================
// GET SINGLE TASK
// ==========================================

const getTaskById = async (req, res) => {
    try {
        // 1. Check authentication
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 2. Get user ID from JWT
        const userId = req.user.userId;

        // 3. Get task ID from URL
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Task ID is required"
            });
        }

        // 4. Find task belonging to logged-in user
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("id", id)
            .eq("user_id", userId)
            .maybeSingle();

        // 5. Handle Supabase error
        if (error) {
            console.error("Get task error:", error);

            return res.status(500).json({
                message: "Failed to get task",
                error: error.message
            });
        }

        // 6. Task not found
        if (!data) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // 7. Return task
        return res.status(200).json({
            message: "Task retrieved successfully",
            task: data
        });

    } catch (error) {
        console.error("Get task by ID error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
// ==========================================
// UPDATE TASK
// ==========================================

const updateTask = async (req, res) => {
    try {
        // 1. Check authentication
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 2. Get user ID from JWT
        const userId = req.user.userId;

        // 3. Get task ID from URL
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Task ID is required"
            });
        }

        // 4. Get updated fields
        const {
            title,
            description,
            priority,
            status,
            due_date
        } = req.body;

        // 5. Validate title if provided
        if (title !== undefined && title.trim() === "") {
            return res.status(400).json({
                message: "Task title cannot be empty"
            });
        }

        // 6. Validate priority if provided
        const allowedPriorities = [
            "Low",
            "Medium",
            "High"
        ];

        if (
            priority !== undefined &&
            !allowedPriorities.includes(priority)
        ) {
            return res.status(400).json({
                message: "Priority must be Low, Medium or High"
            });
        }

        // 7. Validate status if provided
        const allowedStatuses = [
            "Pending",
            "Completed"
        ];

        if (
            status !== undefined &&
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                message: "Status must be Pending or Completed"
            });
        }

        // 8. Create update object
        const updates = {};

        if (title !== undefined) {
            updates.title = title.trim();
        }

        if (description !== undefined) {
            updates.description = description;
        }

        if (priority !== undefined) {
            updates.priority = priority;
        }

        if (status !== undefined) {
            updates.status = status;
        }

        if (due_date !== undefined) {
            updates.due_date = due_date;
        }

        // Always update updated_at
        updates.updated_at = new Date().toISOString();

        // 9. Check if anything was provided
        if (Object.keys(updates).length === 1) {
            return res.status(400).json({
                message: "No fields provided to update"
            });
        }

        // 10. Update task
        const { data, error } = await supabase
            .from("tasks")
            .update(updates)
            .eq("id", id)
            .eq("user_id", userId)
            .select("*")
            .maybeSingle();

        // 11. Handle Supabase error
        if (error) {
            console.error("Update task error:", error);

            return res.status(500).json({
                message: "Failed to update task",
                error: error.message
            });
        }

        // 12. Task not found
        if (!data) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // 13. Success
        return res.status(200).json({
            message: "Task updated successfully",
            task: data
        });

    } catch (error) {
        console.error("Update task error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
// ==========================================
// DELETE TASK
// ==========================================

const deleteTask = async (req, res) => {
    try {
        // 1. Check authentication
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 2. Get user ID from JWT
        const userId = req.user.userId;

        // 3. Get task ID from URL
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Task ID is required"
            });
        }

        // 4. Delete only if task belongs to logged-in user
        const { data, error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", id)
            .eq("user_id", userId)
            .select("*")
            .maybeSingle();

        // 5. Handle Supabase error
        if (error) {
            console.error("Delete task error:", error);

            return res.status(500).json({
                message: "Failed to delete task",
                error: error.message
            });
        }

        // 6. Task not found
        if (!data) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // 7. Success
        return res.status(200).json({
            message: "Task deleted successfully",
            task: data
        });

    } catch (error) {
        console.error("Delete task error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};