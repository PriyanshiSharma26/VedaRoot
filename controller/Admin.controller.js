import { validationResult } from "express-validator";
import Admin from "../model/Admin.model.js"
import bcrypt from "bcryptjs"
import { request, response } from "express";
import jwt from "jsonwebtoken";

export const signUp=async(request,response,next)=>{
    try{
        const errors=validationResult(request)
        if(!errors.isEmpty())
            return response.status(401).json({error:"bad request",details: errors.array()})
        let saltKey=bcrypt.genSaltSync(10);
        let encryptedPassword=bcrypt.hashSync(request.body.password,saltKey)
        request.body.password=encryptedPassword

        let admin=await Admin.create(request.body)
        return response.status(201).json({message:"Sign up success",admin})
        
    }
    catch(err)
    {
        console.log(err)
        return response.status(500).json({error:"Internal Server Error"})
    }
}





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