import { validationResult } from "express-validator";
import Admin from "../model/Admin.model.js"
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken";
import { request, response } from "express";

export const signUp = async (request, response, next) => {
    try {
        
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ error: "Bad request", details: errors.array() });
        }

        
        const { name, email, password, lastlogin } = request.body;

        
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return response.status(400).json({ error: "Email is already in use" });
        }

    
        console.log("Password before hashing:", password);

    
        const saltKey = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, saltKey);

    
        console.log("Password after hashing:", encryptedPassword);

        const admin = new Admin({
            name,
            email,
            password: encryptedPassword, 
            lastlogin,
        });

        
        await admin.save();

    
        admin.password = undefined;

        
        response.status(201).json({ message: "Admin created successfully", admin });
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: "Internal Server Error" });
    }
};




export const signIn=async(request,response,next)=>{

    try{
        const {email,password}=request.body

    //     console.log('Received email:', email);  
    //    console.log('Received password:', password); 
        let admin= await Admin.findOne({email})

        if(admin)
        {
            let status=bcrypt.compareSync(password,admin.password)
            return status? response.status(200).json({message:"SignIn Success....",admin,token: generateToken(admin._id)}):response.status(401).json({error:"Bad request | Invalid password"})
            
        }
        else{
            return response.status(401).json({error:"Bad request | Invalid emailId"})
        }
    }
    catch(err)

    {
        console.log(err)
        return response.status(500).json({error:"Internal Server Error......"})

    }

}
const generateToken = (adminId)=>{
    let token = jwt.sign({payload: adminId},"fsdfsdrereioruxvxncnv");
    return token; 
 }