import express from "express";
import { signUp,signIn } from "../controller/Admin.controller.js";

import { body } from "express-validator";

const AdminRouter = express.Router();

AdminRouter.post(
  "/signup",
  // Name validation (not empty, and trimmed)
  body("name", "Name is required").notEmpty().trim(),

  // Email validation (check for valid email format, not empty)
  body("email", "Invalid email id").isEmail().normalizeEmail(),

  // Custom Password validation (without regex)
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      // Custom password validation logic
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasLowerCase || !hasUpperCase || !hasSpecialChar) {
        throw new Error(
          "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
        );
      }

      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      return true;
    }),

  // Custom Contact validation (without regex)
  // body("contact")
  //   .notEmpty()
  //   .withMessage("Contact is required")
  //   .isNumeric()
  //   .withMessage("Contact must contain only digits")
  //   .isLength({ min: 10, max: 10 })
  //   .withMessage("Contact number should be exactly 10 digits")
  //   .custom((value) => {
  //     // Additional logic for contact number can be added here, if needed
  //     return true;
  //   }),

  // Invoke the signup controller function after validation
  signUp
);



AdminRouter.post("/signin",signIn)







export default AdminRouter;
