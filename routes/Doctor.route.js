import express from "express";
import { body } from "express-validator";
import { doctorSignUp, doctorSignIn } from "../controller/Doctor.controller.js";

const DoctorRouter = express.Router();

// Custom password validation function
const passwordValidation = (password) => {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  let hasLowerCase = false;
  let hasUpperCase = false;
  let hasNumber = false;
  let hasSpecialChar = false;

  // Check for lowercase, uppercase, number, and special character
  for (let char of password) {
    if (/[a-z]/.test(char)) hasLowerCase = true;
    if (/[A-Z]/.test(char)) hasUpperCase = true;
    if (/\d/.test(char)) hasNumber = true;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(char)) hasSpecialChar = true;
  }

  if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar) {
    throw new Error(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    );
  }

  return true;
};

// Doctor Sign-Up Route with validation
DoctorRouter.post(
  "/signup",

  // Doctor Name Validation
  body("name", "Name is required").notEmpty().trim(),

  // Email Validation
  body("email", "Invalid email id").isEmail().normalizeEmail(),

  // Password Validation
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => passwordValidation(value)),

  // Contact Number Validation (exactly 10 digits)
  body("contactNo")
    .notEmpty()
    .withMessage("Contact number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number should be exactly 10 digits")
    .isNumeric()
    .withMessage("Contact number must contain only digits"),

  // Registration Number Validation
  body("registrationNo", "Registration number is required").notEmpty().trim(),

  // Specialization Validation
  body("specialization", "Specialization is required").notEmpty().trim(),

  // General Availability (Days) Validation
  body("availableDays")
    .isArray({ min: 1 })
    .withMessage("At least one availability day is required"),

  // Start and End Time Validation
  body("startTime", "Start time is required").notEmpty(),
  body("endTime", "End time is required").notEmpty(),

  // Bio Validation (max 1000 characters)
  body("bio")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Bio can be a maximum of 1000 characters"),

  // Consultation Fee Validation (cannot be negative)
  body("consultationFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Consultation fee cannot be negative"),

  // Profile Picture Validation (URL format)
  body("profilePicture")
    .optional()
    .isURL()
    .withMessage("Please provide a valid URL for the profile picture"),

  // Gender Validation (Optional but required if provided)
  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other"),

  // Call doctorSignUp controller if all validations pass
  doctorSignUp
);

// Doctor Sign-In Route
DoctorRouter.post("/signin",
    
    body("email", "Invalid email id").isEmail().normalizeEmail(),

  // Password Validation: Check if password is provided
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

    
    
    
    doctorSignIn);

export default DoctorRouter;
