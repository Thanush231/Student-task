const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // 2. Check if user already exists
        const { data: existingUser, error: existingUserError } =
            await supabase
                .from("users")
                .select("id")
                .eq("email", email)
                .maybeSingle();

        if (existingUserError) {
            return res.status(500).json({
                message: "Error checking user",
                error: existingUserError.message
            });
        }

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Insert user into Supabase
        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            ])
            .select("id, name, email, created_at")
            .single();

        if (error) {
            return res.status(500).json({
                message: "Failed to create user",
                error: error.message
            });
        }

        // 5. Send response
        return res.status(201).json({
            message: "User registered successfully",
            user: data
        });

    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // 2. Find user by email
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) {
            console.error("Supabase error:", error);

            return res.status(500).json({
                message: "Error finding user",
                error: error.message
            });
        }

        // 3. Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 4. Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 5. Check JWT secret
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in .env");

            return res.status(500).json({
                message: "JWT configuration error"
            });
        }

        // 6. Create JWT
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // 7. Return successful login response
        return res.status(200).json({
            message: "Login successful",

            token: token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {
    registerUser,
    loginUser
};