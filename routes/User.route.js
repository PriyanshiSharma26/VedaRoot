import express from "express";
import { signUp, signIn,ViewUser,ViewUserById ,viewUserByName,UpdateUserProfile,forgetPassword} from "../controller/User.controller.js";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";


const UserRouter = express.Router();


UserRouter.post(
  "/signup",
  
  body("userName", "User Name is required").notEmpty().trim(),

  
  body("email", "Invalid email id").isEmail().normalizeEmail(),

  
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      
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

  
  body("contactNo")
    .notEmpty()
    .withMessage("Contact is required")
    .isNumeric()
    .withMessage("Contact must contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number should be exactly 10 digits"),

  
  body("address").notEmpty().withMessage("Address is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("pinCode").notEmpty().withMessage("Pin code is required"),

  
//   body("gender")
//     .notEmpty()
//     .withMessage("Gender is required")
//     .isIn(["Male", "Female", "Other"])
//     .withMessage("Gender must be Male, Female, or Other"),

  signUp
);


UserRouter.post("/signin", 
  

  body("email", "Invalid email id").isEmail().normalizeEmail(),

  // Password Validation: Check if password is provided
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  
  
  signIn);

// http://localhost:3000/User/searchByUserName/Ram
  UserRouter.get("/viewUser",auth,ViewUser)
  UserRouter.get("/:id",ViewUserById)
  UserRouter.get("/searchByUserName/:userName",viewUserByName)
  UserRouter.put("/updateProfile/:id",UpdateUserProfile)
  UserRouter.post("/forgetPassword",forgetPassword)


export default UserRouter;
