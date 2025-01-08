import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../model/User.model.js'; 
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import sendMail from '../config/nodemailer.js';




//signup

export const signUp = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Bad request', details: errors.array() });
        }

        const { userName, email, password, contactNo, address, city, state, pinCode, gender } = req.body;

        
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const user = new User({
            userName,
            email,
            password: hashedPassword,
            contactNo,
            address,
            city,
            state,
            pinCode,
            gender
        });

    
        await user.save();

        
        user.password = undefined;

        
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//signin


export const signIn = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Bad request', details: errors.array() });
        }

    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password',  });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        
        user.password = undefined;

    
        res.status(200).json({ message: 'Sign-in successful', user ,token: generateToken(user._id)});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const generateToken = (userId)=>{
    let token = jwt.sign({payload: userId},"fsdfsdrereioruxvxncnv");
    return token; 
 }



//view Users


 export const ViewUser = async (req, res) => {
     try {
         // Fetch all users
         let users = await User.find().select('-password');
 
         
         if (users.length > 0) {
             return res.status(200).json({ users });
         } else {
             return res.status(404).json({ error: "No users found" });
         }
     } 
       catch(err) {

         return res.status(500).json({ error: "Internal Server Error" });
     }
 };
 


 // find user by id

 export const ViewUserById=async (req,res)=>{
    try{

        let _id=req.params.id
        let user=await User.findOne({_id})
        if(user)
        {
            return res.status(200).json({user})
        
        }
        else{
            return res.status(404).json({error: "Requested resouce not available | id not found"});  
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: "Internal Server Error"});

    }
 }


// get user by name


 export const viewUserByName = async (req, res) => {
    try {
        console.log( req.params);  
        let userName = req.params.userName; 
        console.log(userName);  

        
        let user = await User.findOne({ userName: userName });

        
        if (user) {
            return res.status(200).json({ user });
        } else {
            
            return res.status(404).json({ error: "Requested resource not available | name not found" });
        }
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



// update user



export const UpdateUserProfile = async (req, res) => {
    try {
        
        let userId = req.params.id;
        let updateData = req.body;

        
        let user = await User.updateOne({ _id: userId }, { $set: updateData });

        
        if (user.modifiedCount === 0) {
            return res.status(404).json({ error: "User not found or no changes made" });
        }

        return res.status(200).json({ message: "User profile updated successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};









// export const ResetPassword = async (req, res) => {
//     try {
//         const { token } = req.params;  
//         const { newPassword } = req.body;  

        
//         const JWT_SECRET = 'your_jwt_secret_key'; 

        
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const userId = decoded.userId;

        
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

        
//         const isSamePassword = await bcrypt.compare(newPassword, user.password);
//         if (isSamePassword) {
//             return res.status(400).json({ error: "New password cannot be the same as the current password" });
//         }

    
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

        
//         user.password = hashedPassword;
//         await user.save();

//         return res.status(200).json({ message: "Password updated successfully" });
//     } catch (err) {
//         console.error(err);
//         return res.status(400).json({ error: "Invalid or expired token" });
//     }
// };





// export const ForgetPassword=async(req,res)=>{
//     try{
//         const userData=await User.findOne({email:req.body.email})

//         if(userData)
//         {

//         }
//         else{
//             res.status(200).json({message:"email not  exists...."})
//         }
//     }
//     catch(error)
//     {
//         res.state(400).json({error:"internal server error"})
//     }
// }




// Reset Password - Validate token and update password


// export const resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params;  
//         const { newPassword } = req.body; 
        
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpiry: { $gt: Date.now() },  
//         });

//         if (!user) {
//             return res.status(400).json({ error: 'Invalid or expired token' });
//         }

      
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(newPassword, salt);

        
//         user.password = hashedPassword;

        
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpiry = undefined;

       
//         await user.save();

       
//         res.status(200).json({ message: 'Password has been reset successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };




export const forgetPassword=async(req,res)=>{

    try{
        const email=req.body.email
        const user=await User.findOne({email:email})
        if(user)
        {
            const token=randomstring.generate()
            const updateData=await User.updateOne({_id:user._id},{$set:{token:token}})

            await sendMail(user.email,token)
            res.status(200).send({success:true,message:"check email for reset password link"})

        }
        else{
            return res.status(200).json({ error: "User with this email doesn't exists"});

        }

    }
    
    
    catch(err) {
                 console.error(err);
             res.status(500).json({ error: 'Internal Server Error' });
            }

    }



