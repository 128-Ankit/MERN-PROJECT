const { z } = require("zod");

//creating an object schema
const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters"),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email("Please enter a valid email address"),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, "Password should have at least 8 characters")
        .max(15, "Password cannot exceed 15 characters"),
    phoneNumber: z
        .string({ required_error: "Phone Number is required" })
        .trim()
        .min(10, "Phone Number should have at least 10 characters")
        .max(20, "Phone Number cannot exceed 15 characters"),
});

module.exports = signupSchema;
