require("dotenv").config();

console.log("SUPABASE_URL exists:", !!process.env.SUPABASE_URL);
console.log("SUPABASE_KEY exists:", !!process.env.SUPABASE_KEY);

const supabase = require("./config/supabase");

async function testDatabase() {
    const { data, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        console.error("Database connection failed:");
        console.error(error);
        return;
    }

    console.log("Database connected successfully!");
    console.log(data);
}

testDatabase();